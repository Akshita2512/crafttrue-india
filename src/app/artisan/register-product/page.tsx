'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Tag, Sparkles, Check, ArrowRight, Printer, Download, UserCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ArtisanRegisterPage() {
  const [productName, setProductName] = useState('Ancestral Dabu Mud-Resist Hand-Block Stole');
  const [titleHi, setTitleHi] = useState('पारंपरिक डाबू मड-रेसिस्ट ब्लॉक स्टोल');
  const [cluster, setCluster] = useState<'Bagru' | 'Sanganer'>('Bagru');
  const [weavingMethod, setWeavingMethod] = useState<'Handloom' | 'Mill-Made' | 'Powerloom'>('Handloom');
  const [printingTechnique, setPrintingTechnique] = useState<'Mud-Resist Dabu Hand-Block' | 'Traditional Hand-Block'>('Mud-Resist Dabu Hand-Block');
  const [dyeType, setDyeType] = useState<'100% Natural Vegetable Dye' | 'Alizarin & Harda Mineral' | 'Synthetic Pigment Dye'>('100% Natural Vegetable Dye');
  const [fabricComp, setFabricComp] = useState('100% Pure Handloom Cotton (60s count)');
  const [retailPrice, setRetailPrice] = useState('2200');

  // Breakdown state
  const [fabricCost, setFabricCost] = useState('450');
  const [laborCost, setLaborCost] = useState('650');
  const [blockCost, setBlockCost] = useState('280');
  const [washCost, setWashCost] = useState('200');

  // Generated Tag State
  const [generatedCode, setGeneratedCode] = useState('CTI-BAG-000185');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    // Generate QR code for the initial code
    const verifyUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://crafttrue.in'}/verify/${generatedCode}`;
    QRCode.toDataURL(verifyUrl, { width: 250, margin: 1 })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [generatedCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = cluster === 'Bagru' 
      ? `CTI-BAG-${Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)}`
      : `CTI-SAN-${Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)}`;
    setGeneratedCode(newCode);

    const verifyUrl = `${window.location.origin}/verify/${newCode}`;
    QRCode.toDataURL(verifyUrl, { width: 250, margin: 1 })
      .then(url => {
        setQrDataUrl(url);
        setIsGenerated(true);
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Artisan &amp; Producer Portal • कारीगर पंजीकरण केंद्र</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Register Craft &amp; Generate Authenticity Swing Tag
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
          Declare your hand-block printing details, upload batch evidence, and generate tamper-evident physical QR labels for your textile creations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Product Submission */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-700" />
            <span>Product Registration Form</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Cluster & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Craft Cluster (शिल्प क्षेत्र):</label>
                <select
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value as any)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-medium"
                >
                  <option value="Bagru">Bagru (बागरू - Dabu Mud Resist)</option>
                  <option value="Sanganer">Sanganer (सांगानेर - Fine Floral)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Retail Price (INR ₹):</label>
                <input
                  type="number"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Product Title (English):</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Product Title (हिंदी में):</label>
              <input
                type="text"
                value={titleHi}
                onChange={(e) => setTitleHi(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-medium"
              />
            </div>

            {/* Weaving vs. Printing Core Distinction */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
              <p className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Critical Technical Declarations (अलग-अलग दर्ज करें):</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Weaving Method (बुनाई):</label>
                  <select
                    value={weavingMethod}
                    onChange={(e) => setWeavingMethod(e.target.value as any)}
                    className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
                  >
                    <option value="Handloom">Handloom (हथकरघा)</option>
                    <option value="Mill-Made">Mill-Made (मिल-निर्मित कॉटन)</option>
                    <option value="Powerloom">Powerloom (पावरलूम)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Printing Technique (छपाई तकनीक):</label>
                  <select
                    value={printingTechnique}
                    onChange={(e) => setPrintingTechnique(e.target.value as any)}
                    className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-semibold"
                  >
                    <option value="Mud-Resist Dabu Hand-Block">Mud-Resist Dabu Hand-Block (डाबू ब्लॉक)</option>
                    <option value="Traditional Hand-Block">Traditional Hand-Block (पारंपरिक ब्लॉक)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Dye Composition (रंग प्रकार):</label>
                  <select
                    value={dyeType}
                    onChange={(e) => setDyeType(e.target.value as any)}
                    className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
                  >
                    <option value="100% Natural Vegetable Dye">100% Natural Vegetable Dye (प्राकृतिक रंग)</option>
                    <option value="Alizarin & Harda Mineral">Alizarin &amp; Harda Mineral (हल्दी व हरड़ा)</option>
                    <option value="Synthetic Pigment Dye">Synthetic Pigment Dye (पिगमेंट रंग)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Fabric Composition:</label>
                  <input
                    type="text"
                    value={fabricComp}
                    onChange={(e) => setFabricComp(e.target.value)}
                    className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Voluntary Price Transparency */}
            <div className="space-y-2 pt-2">
              <label className="block text-stone-700 font-semibold">
                Voluntary Price Breakdown (पारदर्शी लागत विवरण - INR ₹):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[10px] text-stone-500">Fabric Cost</span>
                  <input
                    type="number"
                    value={fabricCost}
                    onChange={(e) => setFabricCost(e.target.value)}
                    className="w-full p-1.5 bg-stone-50 border border-stone-200 rounded font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500">Artisan Labor</span>
                  <input
                    type="number"
                    value={laborCost}
                    onChange={(e) => setLaborCost(e.target.value)}
                    className="w-full p-1.5 bg-amber-50 border border-amber-200 rounded font-mono font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500">Block Stamping</span>
                  <input
                    type="number"
                    value={blockCost}
                    onChange={(e) => setBlockCost(e.target.value)}
                    className="w-full p-1.5 bg-stone-50 border border-stone-200 rounded font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500">Washing/River</span>
                  <input
                    type="number"
                    value={washCost}
                    onChange={(e) => setWashCost(e.target.value)}
                    className="w-full p-1.5 bg-stone-50 border border-stone-200 rounded font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Generate Approved Product Tag &amp; QR Identity</span>
            </button>
          </form>
        </div>

        {/* Right Preview: Printable Physical Authenticity Swing Tag */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-stone-900">
              Printable Physical Hangtag Preview
            </h3>
            <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold">
              Live Preview
            </span>
          </div>

          {/* PHYSICAL HANGTAG CARD DESIGN (Artisan Swing Tag) */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-dashed border-amber-800/40 shadow-xl space-y-4 relative text-stone-900">
            {/* Tag Hole Simulation */}
            <div className="w-5 h-5 rounded-full bg-stone-300 border-2 border-stone-400 mx-auto shadow-inner" />

            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-amber-900 uppercase">
                CraftTrue India Authenticity Tag
              </span>
              <h4 className="font-serif text-lg font-bold leading-tight text-stone-900">
                {productName}
              </h4>
              <p className="text-xs font-serif text-amber-900">{titleHi}</p>
            </div>

            {/* Generated QR Code Image */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs max-w-[200px] mx-auto text-center space-y-1">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Product QR Code" className="w-full h-auto mx-auto" />
              ) : (
                <div className="w-40 h-40 bg-stone-100 flex items-center justify-center text-xs text-stone-400">
                  Generating QR...
                </div>
              )}
              <p className="font-mono text-[11px] font-bold text-stone-800 tracking-wider">
                {generatedCode}
              </p>
            </div>

            <div className="space-y-1 text-center text-[11px] text-stone-600 border-t border-amber-900/10 pt-3">
              <p><strong>Cluster:</strong> {cluster} (GI Protected Hand Block)</p>
              <p><strong>Weaving:</strong> {weavingMethod} • <strong>Print:</strong> {printingTechnique}</p>
              <p><strong>Dyes:</strong> {dyeType}</p>
              <p className="font-bold text-stone-900 pt-1 text-xs">
                M.R.P: ₹{Number(retailPrice).toLocaleString('en-IN')} (Incl. all taxes)
              </p>
            </div>

            <div className="bg-amber-900 text-amber-100 text-[9px] py-1 text-center font-medium rounded">
              Scan with phone to inspect 7-Layer Authenticity Scorecard
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Swing Tag</span>
            </button>
            <Link
              href={`/verify/${generatedCode}`}
              className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition text-center"
            >
              <span>Test Verification Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
