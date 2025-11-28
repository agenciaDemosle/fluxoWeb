<?php
/**
 * Flow Payment Confirmation for FluxoWeb
 * This endpoint is called by Flow after payment is completed
 */

header('Content-Type: application/json');

// Flow API credentials - TODO: Replace with your Flow credentials
$flowApiKey = 'YOUR_FLOW_API_KEY';
$flowSecretKey = 'YOUR_FLOW_SECRET_KEY';
$flowApiUrl = 'https://www.flow.cl/api'; // Production URL
// For sandbox: $flowApiUrl = 'https://sandbox.flow.cl/api';

// Get token from Flow callback
$token = $_GET['token'] ?? $_POST['token'] ?? null;

if (!$token) {
    error_log("[Flow Confirm - Fluxo] No token provided");
    http_response_code(400);
    echo json_encode(['error' => 'Missing token']);
    exit;
}

error_log("[Flow Confirm - Fluxo] Received token: $token");

// Prepare parameters for Flow getStatus
$params = [
    'apiKey' => $flowApiKey,
    'token' => $token
];

// Generate signature
ksort($params);
$toSign = "";
foreach ($params as $key => $value) {
    $toSign .= $key . $value;
}
$signature = hash_hmac('sha256', $toSign, $flowSecretKey);
$params['s'] = $signature;

// Request payment status from Flow
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "$flowApiUrl/payment/getStatus");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    error_log("[Flow Confirm - Fluxo] Flow API error: HTTP $httpCode - $response");
    http_response_code(500);
    echo json_encode(['error' => 'Flow API error']);
    exit;
}

$paymentData = json_decode($response, true);

if (!isset($paymentData['status'])) {
    error_log("[Flow Confirm - Fluxo] Invalid Flow response: " . print_r($paymentData, true));
    http_response_code(500);
    echo json_encode(['error' => 'Invalid Flow response']);
    exit;
}

// Flow payment statuses: 1=Pending, 2=Paid, 3=Rejected, 4=Cancelled
$isPaid = $paymentData['status'] == 2;
$orderId = $paymentData['commerceOrder'] ?? null;

error_log("[Flow Confirm - Fluxo] Order #$orderId - Status: {$paymentData['status']} - Paid: " . ($isPaid ? 'YES' : 'NO'));

// TODO: Update WooCommerce order status via API
// You can call the WooCommerce API here to update the order to 'processing' or 'completed'

http_response_code(200);
echo json_encode([
    'success' => true,
    'isPaid' => $isPaid,
    'status' => $paymentData['status'],
    'orderId' => $orderId
]);
