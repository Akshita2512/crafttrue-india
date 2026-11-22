'use client';

import React, { useState } from 'react';
import { DEMO_PRODUCTS, DEMO_AUDIT_LOGS, DEMO_COMPLAINTS } from '@/lib/data/craftData';
import { CraftProduct, AuditLog, ConsumerComplaint, VerificationStatus } from '@/lib/types';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  History, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Eye, 
  Clock, 
  Check, 
  Search,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

export default function AdminVerifierDashboard() {
  const [activeTab, setActiveTab] = useState<'queue' | 'audit' | 'anomalies' | 'complaints'>('queue');
  const [productsList, setProductsList] = useState<CraftProduct[]>(DEMO_PRODUCTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(DEMO_AUDIT_LOGS);
  const [complaints, setComplaints] = useState<ConsumerComplaint[]>(DEMO_COMPLAINTS);
  
  // Modal / Review state
  const [selectedProduct, setSelectedProduct] = useState<CraftProduct | null>(null);
  const [newStatus, setNewStatus] = useState<VerificationStatus>('VERIFIED');
  const [justificationNote, setJustificationNote] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    // 1. Update Product Status
    const updated = productsList.map(p => 
      p.id === selectedProduct.id ? { ...p, verification_status: newStatus } : p
    );
    setProductsList(updated);

    // 2. Append to Immutable Audit Log
    const newLog: AuditLog = {
      id: `l-${Date.now()}`,
      product_id: selectedProduct.id,
      action: 'STATUS_CHANGE',
      previous_state: selectedProduct.verification_status,
      new_state: newStatus,
      performed_by: 'Dr. Alok Verma (Independent Verifier)',
      justification: justificationNote || 'Evidence evaluated against GI specifications.',
      created_at: 'Just now'
    };
    setAuditLogs([newLog, ...auditLogs]);

    setSuccessMessage(`Product ${selectedProduct.product_code} updated to ${newStatus}`);
    setSelectedProduct(null);
    setJustificationNote('');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Independent Verifier Board • स्वतंत्र सत्यापन प्रकोष्ठ</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            CRAFTTRUE Verification &amp; Audit Dashboard
          </h1>
          <p className="text-xs text-stone-500">
            Authenticated as <strong>Dr. Alok Verma</strong> (Lead Verifier ID: AGY-ADMIN-01)
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1.5 rounded-xl border border-stone-200 text-xs">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-2 rounded-lg font-semibold transition ${
              activeTab === 'queue' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Verification Queue ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-2 rounded-lg font-semibold transition ${
              activeTab === 'audit' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Audit Trail ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('anomalies')}
            className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'anomalies' ? 'bg-orange-600 text-white shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Duplication Alerts (1)</span>
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-3 py-2 rounded-lg font-semibold transition ${
              activeTab === 'complaints' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Complaints ({complaints.length})
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* TAB 1: VERIFICATION QUEUE */}
      {activeTab === 'queue' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900">
              Registered Products for Claim-by-Claim Verification
            </h3>
            <span className="text-xs text-stone-500 font-medium">Independent Review Mandate</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Tag ID / Code</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Cluster</th>
                  <th className="p-4">Weaving / Print</th>
                  <th className="p-4">Verification Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {productsList.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50/70 transition">
                    <td className="p-4 font-mono font-bold text-amber-900">
                      {product.product_code}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-stone-900">{product.name}</p>
                      <p className="text-[11px] text-stone-500">{product.artisan_workshop?.artisan_name || 'Unverified Seller'}</p>
                    </td>
                    <td className="p-4 font-medium text-stone-700">
                      {product.cluster}
                    </td>
                    <td className="p-4 text-stone-600">
                      <span className="font-medium">{product.weaving_method}</span> • {product.printing_technique}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        product.verification_status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : product.verification_status === 'PARTIALLY_VERIFIED'
                          ? 'bg-amber-100 text-amber-800'
                          : product.verification_status === 'CONFIRMED_MISREPRESENTATION'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {product.verification_status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setNewStatus(product.verification_status);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-semibold text-[11px] hover:bg-stone-800"
                      >
                        Audit Claims
                      </button>
                      <Link
                        href={`/verify/${product.product_code}`}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 font-semibold text-[11px] hover:bg-stone-100"
                      >
                        Public View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: IMMUTABLE AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <History className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Immutable Verifier Decision Audit Trail
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Every status change is cryptographically logged with reviewer credentials and justification notes to prevent corrupt or purchased authenticity ticks.
          </p>

          <div className="divide-y divide-stone-100">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-4 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{log.performed_by}</span>
                    <span className="text-stone-400">•</span>
                    <span className="font-mono text-[11px] font-semibold text-amber-800">{log.action}</span>
                  </div>
                  <span className="text-stone-400 text-[11px]">{log.created_at}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <span className="line-through text-stone-400">{log.previous_state}</span>
                  <span>→</span>
                  <span className="font-bold text-emerald-700">{log.new_state}</span>
                </div>
                <p className="text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100 text-[11px]">
                  <strong>Justification:</strong> "{log.justification}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DUPLICATE SCAN ANOMALY MONITORING */}
      {activeTab === 'anomalies' && (
        <div className="bg-white rounded-2xl border border-orange-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-orange-100">
            <ShieldAlert className="w-5 h-5 text-orange-600" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Tamper-Detection &amp; Duplicate QR Anomaly Monitor
            </h3>
          </div>
          <p className="text-xs text-stone-600">
            Heuristic security engine flags products exhibiting suspicious scan frequencies across geographically distant regions within impossible travel windows.
          </p>

          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-stone-900">CTI-DUP-000412</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-600 text-white">
                38 TOTAL SCANS (SUSPECT CLONED LABEL)
              </span>
            </div>
            <p className="text-xs text-orange-950">
              <strong>Alert Details:</strong> 28 scans recorded within 45 minutes across Connaught Place (New Delhi), Bandra (Mumbai), and Indiranagar (Bengaluru).
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => alert('Temporary suspension notice sent to retailer. Field investigator dispatched.')}
                className="px-3.5 py-1.5 rounded-lg bg-orange-700 hover:bg-orange-800 text-white font-semibold text-xs"
              >
                Dispatch Field Inspector
              </button>
              <button
                onClick={() => alert('QR Code revoked from public lookup.')}
                className="px-3.5 py-1.5 rounded-lg border border-orange-300 text-orange-900 hover:bg-orange-100 font-semibold text-xs"
              >
                Revoke QR Identity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONSUMER COMPLAINTS */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <AlertTriangle className="w-5 h-5 text-rose-700" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Consumer Craftwashing Grievances
            </h3>
          </div>

          <div className="divide-y divide-stone-100">
            {complaints.map((c) => (
              <div key={c.id} className="py-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-rose-800">{c.complaint_ref_no}</span>
                    <span className="text-stone-400">•</span>
                    <span className="font-semibold text-stone-900">{c.complaint_category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-stone-700">{c.description}</p>
                {c.resolution_notes && (
                  <p className="p-2 rounded bg-stone-50 border border-stone-200 text-stone-600 text-[11px]">
                    <strong>Audit Resolution:</strong> {c.resolution_notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIT MODAL (FOR VERIFYING / CHANGING STATUS) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-300">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Audit Product: {selectedProduct.product_code}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              {selectedProduct.name} ({selectedProduct.cluster} Cluster)
            </p>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Set New Verification Outcome:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as VerificationStatus)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-bold"
                >
                  <option value="VERIFIED">VERIFIED (All 7 layers evidenced)</option>
                  <option value="PARTIALLY_VERIFIED">PARTIALLY VERIFIED (Disclosed variations)</option>
                  <option value="UNVERIFIED">UNVERIFIED (Insufficient records)</option>
                  <option value="UNDER_INVESTIGATION">UNDER INVESTIGATION (Discrepancy / Complaint)</option>
                  <option value="CONFIRMED_MISREPRESENTATION">CONFIRMED MISREPRESENTATION (Craftwashed)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Audit Justification Note (Required for Audit Log):</label>
                <textarea
                  rows={3}
                  value={justificationNote}
                  onChange={(e) => setJustificationNote(e.target.value)}
                  placeholder="Record laboratory findings, workshop inspection results, or GI registry match..."
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-2.5 rounded-lg border border-stone-300 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-stone-900 text-white font-bold hover:bg-stone-800"
                >
                  Save &amp; Log Audit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
