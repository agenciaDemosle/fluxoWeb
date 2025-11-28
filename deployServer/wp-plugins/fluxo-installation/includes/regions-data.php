<?php
/**
 * Chilean Regions Data
 *
 * @package Fluxo_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Fluxo_Installation_Regions {

    /**
     * Get all Chilean regions
     */
    public static function get_regions() {
        return [
            [
                'code' => 'XV',
                'name' => 'Región de Arica y Parinacota',
                'number' => 'XV'
            ],
            [
                'code' => 'I',
                'name' => 'Región de Tarapacá',
                'number' => 'I'
            ],
            [
                'code' => 'II',
                'name' => 'Región de Antofagasta',
                'number' => 'II'
            ],
            [
                'code' => 'III',
                'name' => 'Región de Atacama',
                'number' => 'III'
            ],
            [
                'code' => 'IV',
                'name' => 'Región de Coquimbo',
                'number' => 'IV'
            ],
            [
                'code' => 'V',
                'name' => 'Región de Valparaíso',
                'number' => 'V'
            ],
            [
                'code' => 'RM',
                'name' => 'Región Metropolitana',
                'number' => 'RM'
            ],
            [
                'code' => 'VI',
                'name' => 'Región del Libertador General Bernardo O\'Higgins',
                'number' => 'VI'
            ],
            [
                'code' => 'VII',
                'name' => 'Región del Maule',
                'number' => 'VII'
            ],
            [
                'code' => 'XVI',
                'name' => 'Región de Ñuble',
                'number' => 'XVI'
            ],
            [
                'code' => 'VIII',
                'name' => 'Región del Biobío',
                'number' => 'VIII'
            ],
            [
                'code' => 'IX',
                'name' => 'Región de La Araucanía',
                'number' => 'IX'
            ],
            [
                'code' => 'XIV',
                'name' => 'Región de Los Ríos',
                'number' => 'XIV'
            ],
            [
                'code' => 'X',
                'name' => 'Región de Los Lagos',
                'number' => 'X'
            ],
            [
                'code' => 'XI',
                'name' => 'Región de Aysén del General Carlos Ibáñez del Campo',
                'number' => 'XI'
            ],
            [
                'code' => 'XII',
                'name' => 'Región de Magallanes y de la Antártica Chilena',
                'number' => 'XII'
            ],
        ];
    }

    /**
     * Get region by code
     */
    public static function get_region_by_code($code) {
        $regions = self::get_regions();
        foreach ($regions as $region) {
            if ($region['code'] === $code) {
                return $region;
            }
        }
        return null;
    }
}
