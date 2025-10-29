import React, { useEffect, useMemo, useState } from 'react';
import { FiSave, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { settingsAPI } from '../utils/api';

const defaultSettings = window.storePOSAdmin?.settings || {};

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const layouts = [
  { value: 'classic', label: 'Classic (3-column)' },
  { value: 'compact', label: 'Compact (wider product grid)' },
];

const barcodeFormats = [
  { value: 'ean13', label: 'EAN-13 (Retail standard)' },
  { value: 'code128', label: 'Code 128 (General purpose)' },
  { value: 'upc', label: 'UPC-A' },
];

const barcodeFields = [
  { value: '_sku', label: 'Product SKU' },
  { value: '_barcode', label: 'Custom field (_barcode)' },
  { value: 'id', label: 'Product ID' },
];

const taxDisplayOptions = [
  { value: 'incl', label: 'Prices include tax' },
  { value: 'excl', label: 'Prices exclude tax' },
];

const taxRoundingOptions = [
  { value: 'nearest', label: 'Nearest increment' },
  { value: 'up', label: 'Round up' },
  { value: 'down', label: 'Round down' },
];

const productsPerRowOptions = [1, 2, 3, 4, 5, 6];

const Settings = () => {
  const [form, setForm] = useState({
    theme: 'light',
    layout: 'classic',
    auto_print: false,
    barcode_format: 'ean13',
    barcode_field: '_sku',
    calculate_fee_tax: false,
    tax_display: 'incl',
    tax_rounding: 'nearest',
    products_per_row: 4,
    receipt_header: '',
    receipt_footer: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      let data = defaultSettings;
      if (!data || Object.keys(data).length === 0) {
        const response = await settingsAPI.get();
        if (response.success) {
          data = response.data;
        }
      }
      if (data) {
        setForm({
          theme: data.theme || 'light',
          layout: data.layout || 'classic',
          auto_print: !!data.auto_print,
          barcode_format: data.barcode_format || 'ean13',
          barcode_field: data.barcode_field || '_sku',
          calculate_fee_tax: !!data.calculate_fee_tax,
          tax_display: data.tax_display || 'incl',
          tax_rounding: data.tax_rounding || 'nearest',
          products_per_row: data.products_per_row || 4,
          receipt_header: data.receipt_header || '',
          receipt_footer: data.receipt_footer || '',
        });
        setDirty(false);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setDirty(true);
  };

  const handleToggle = (key) => {
    setForm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        auto_print: form.auto_print,
        calculate_fee_tax: form.calculate_fee_tax,
      };
      const response = await settingsAPI.update(payload);
      if (response.success) {
        toast.success(response.message || 'Settings saved');
        setForm({
          theme: response.data.theme,
          layout: response.data.layout,
          auto_print: !!response.data.auto_print,
          barcode_format: response.data.barcode_format,
          barcode_field: response.data.barcode_field,
          calculate_fee_tax: !!response.data.calculate_fee_tax,
          tax_display: response.data.tax_display,
          tax_rounding: response.data.tax_rounding,
          products_per_row: response.data.products_per_row,
          receipt_header: response.data.receipt_header,
          receipt_footer: response.data.receipt_footer,
        });
        setDirty(false);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const generalSettings = useMemo(() => (
    <div className="card w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">General</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            className="input"
            value={form.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            {themes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
          <select
            className="input"
            value={form.layout}
            onChange={(e) => handleChange('layout', e.target.value)}
          >
            {layouts.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <input
            id="autoPrint"
            type="checkbox"
            className="h-4 w-4 text-primary-600 border-gray-300 rounded"
            checked={form.auto_print}
            onChange={() => handleToggle('auto_print')}
          />
          <label htmlFor="autoPrint" className="text-sm text-gray-700">
            Automatically print receipt after checkout
          </label>
        </div>
      </div>
    </div>
  ), [form.auto_print, form.layout, form.theme]);

  const barcodeSettings = useMemo(() => (
    <div className="card w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Barcode</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Format</label>
          <select
            className="input"
            value={form.barcode_format}
            onChange={(e) => handleChange('barcode_format', e.target.value)}
          >
            {barcodeFormats.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Scanner Field</label>
          <select
            className="input"
            value={form.barcode_field}
            onChange={(e) => handleChange('barcode_field', e.target.value)}
          >
            {barcodeFields.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  ), [form.barcode_field, form.barcode_format]);

  const taxSettings = useMemo(() => (
    <div className="card w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Tax</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Display</label>
          <select
            className="input"
            value={form.tax_display}
            onChange={(e) => handleChange('tax_display', e.target.value)}
          >
            {taxDisplayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rounding</label>
          <select
            className="input"
            value={form.tax_rounding}
            onChange={(e) => handleChange('tax_rounding', e.target.value)}
          >
            {taxRoundingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <input
            id="feeTax"
            type="checkbox"
            className="h-4 w-4 text-primary-600 border-gray-300 rounded"
            checked={form.calculate_fee_tax}
            onChange={() => handleToggle('calculate_fee_tax')}
          />
          <label htmlFor="feeTax" className="text-sm text-gray-700">
            Calculate tax on additional fees (e.g. service charges)
          </label>
        </div>
      </div>
    </div>
  ), [form.calculate_fee_tax, form.tax_display, form.tax_rounding]);

  const layoutSettings = useMemo(() => (
    <div className="card w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Layout & Product Grid</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Products per row
        </label>
        <div className="flex flex-wrap gap-2">
          {productsPerRowOptions.map((value) => (
            <button
              key={value}
              type="button"
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                form.products_per_row === value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300'
              }`}
              onClick={() => handleChange('products_per_row', value)}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Controls the number of product tiles shown in the POS product grid. Higher values show more products per row but each tile becomes smaller.
        </p>
      </div>
    </div>
  ), [form.products_per_row]);

  const receiptSettings = useMemo(() => (
    <div className="card w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Receipt</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Header</label>
          <textarea
            className="input h-32"
            value={form.receipt_header}
            onChange={(e) => handleChange('receipt_header', e.target.value)}
            placeholder="Store name, address, contact info..."
          />
          <p className="text-xs text-gray-500 mt-1">Appears at the top of printed receipts.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Footer</label>
          <textarea
            className="input h-32"
            value={form.receipt_footer}
            onChange={(e) => handleChange('receipt_footer', e.target.value)}
            placeholder="Thank you message, return policy, etc."
          />
          <p className="text-xs text-gray-500 mt-1">Appears at the bottom of printed receipts.</p>
        </div>
      </div>
    </div>
  ), [form.receipt_footer, form.receipt_header]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure the POS experience for your staff and customers.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadSettings}
            disabled={loading}
            className="btn btn-secondary flex items-center gap-2 disabled:opacity-60"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className="btn btn-primary flex items-center gap-2 disabled:opacity-60"
          >
            <FiSave />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card py-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <FiRefreshCw className="text-primary-500 text-3xl animate-spin" />
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {generalSettings}
          {barcodeSettings}
          {taxSettings}
          {layoutSettings}
          {receiptSettings}
        </div>
      )}
    </div>
  );
};

export default Settings;
