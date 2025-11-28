<?php
/**
 * Flow Payment Bridge - FluxoWeb
 * Connects React headless checkout with Flow WordPress plugin
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Load WordPress
$wp_load_paths = [
    __DIR__ . '/../../demosle/wp-load.php',        // From /api/flow-bridge/ to /demosle/
    $_SERVER['DOCUMENT_ROOT'] . '/demosle/wp-load.php',
    __DIR__ . '/../../../demosle/wp-load.php',
];

$wp_loaded = false;
foreach ($wp_load_paths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $wp_loaded = true;
        break;
    }
}

if (!$wp_loaded) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not load WordPress']);
    exit;
}

// Check WooCommerce is active
if (!function_exists('WC')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'WooCommerce not found']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (!isset($data['orderId'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing orderId']);
    exit;
}

$orderId = intval($data['orderId']);

// Get WooCommerce order
$order = wc_get_order($orderId);
if (!$order) {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Order not found']);
    exit;
}

// Get available payment gateways
$available_gateways = WC()->payment_gateways->get_available_payment_gateways();

// Check if Flow gateway is available
if (!isset($available_gateways['flow'])) {
    error_log('[Flow Bridge] Flow gateway not available');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Flow gateway not available. Please install and activate Flow plugin in WordPress.',
        'available_gateways' => array_keys($available_gateways)
    ]);
    exit;
}

$flow_gateway = $available_gateways['flow'];

try {
    // Set payment method in order
    $order->set_payment_method($flow_gateway);
    $order->save();

    // Process payment through Flow plugin
    $result = $flow_gateway->process_payment($orderId);

    if (isset($result['result']) && $result['result'] === 'success') {
        error_log("[Flow Bridge] Payment processed for order #$orderId");
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'redirect' => $result['redirect']
        ]);
    } else {
        error_log("[Flow Bridge] Payment failed for order #$orderId");
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Payment processing failed',
            'result' => $result
        ]);
    }
} catch (Exception $e) {
    error_log("[Flow Bridge] Exception: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
