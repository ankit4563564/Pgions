'use client';
import { useState } from 'react';
import { FileText, Download, User, Home, Calendar, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import styles from './AgreementGenerator.module.css';

export default function AgreementGenerator({ listing }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tenantName: '',
    ownerName: listing?.owner?.name || 'Vikas Sharma',
    address: listing?.address || '123, Rose Villa, Koramangala, Bangalore',
    rent: listing?.price || '',
    deposit: (listing?.price * 2) || '',
    startDate: new Date().toISOString().split('T')[0],
    duration: '11 Months',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const { tenantName, ownerName, address, rent, deposit, startDate, duration } = formData;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(33, 33, 33);
    doc.text('RENTAL AGREEMENT', 105, 25, { align: 'center' });
    
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(1);
    doc.line(20, 30, 190, 30);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    let y = 45;
    const addText = (text, isBold = false) => {
      if (isBold) doc.setFont('helvetica', 'bold');
      else doc.setFont('helvetica', 'normal');
      
      const lines = doc.splitTextToSize(text, 170);
      doc.text(lines, 20, y);
      y += (lines.length * 7);
    };

    addText(`This Rental Agreement is made on this date ${new Date().toLocaleDateString()} at Bangalore, Karnataka.`, false);
    y += 5;
    
    addText('BETWEEN:', true);
    addText(`${ownerName}, hereinafter referred to as the 'LESSOR' (Owner), which expression shall mean and include his heirs, successors, and assigns of the one part;`, false);
    y += 5;
    
    addText('AND:', true);
    addText(`${tenantName}, hereinafter referred to as the 'LESSEE' (Tenant), which expression shall mean and include his heirs, successors, and assigns of the other part;`, false);
    y += 10;

    addText('1. PREMISES:', true);
    addText(`The Lessor hereby agrees to let out the premises located at: ${address}.`, false);
    y += 5;

    addText('2. TERM:', true);
    addText(`The lease shall be for a period of ${duration}, commencing from ${startDate}.`, false);
    y += 5;

    addText('3. RENT & DEPOSIT:', true);
    addText(`The Lessee agrees to pay a monthly rent of Rs. ${rent}/- on or before the 5th of every month. A security deposit of Rs. ${deposit}/- has been paid by the Lessee to the Lessor, which is refundable at the time of vacating the premises.`, false);
    y += 10;

    addText('4. TERMS & CONDITIONS:', true);
    addText('- The premises shall be used for residential purposes only.', false);
    addText('- The Lessee shall pay the electricity and water charges separately.', false);
    addText('- Sub-letting of the premises is strictly prohibited.', false);
    addText('- Either party can terminate the agreement by giving 1 month notice.', false);
    
    y += 20;
    doc.text('__________________________', 20, y);
    doc.text('__________________________', 130, y);
    y += 7;
    doc.text('Signature of Lessor', 25, y);
    doc.text('Signature of Lessee', 135, y);

    doc.save(`Rental_Agreement_${tenantName.replace(/\s+/g, '_')}.pdf`);
    setStep(3);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconCircle}>
          <FileText size={24} color="var(--primary)" />
        </div>
        <div className={styles.titleInfo}>
          <h3>AI Rental Agreement Generator</h3>
          <p>Generate a professional draft in seconds.</p>
        </div>
      </div>

      {step === 1 && (
        <div className={styles.form}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label><User size={14} /> Tenant Name</label>
              <input 
                type="text" 
                name="tenantName" 
                placeholder="Full Name as per Aadhaar" 
                value={formData.tenantName}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className={styles.inputGroup}>
              <label><Home size={14} /> Owner Name</label>
              <input 
                type="text" 
                name="ownerName" 
                value={formData.ownerName}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <button 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!formData.tenantName}
            onClick={() => setStep(2)}
          >
            Next: Review Terms <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.reviewPage}>
          <div className={styles.summaryItem}>
            <Calendar size={18} />
            <div>
              <span>Commencement & Duration</span>
              <strong>{formData.startDate} for {formData.duration}</strong>
            </div>
          </div>
          <div className={styles.summaryItem}>
            <CreditCard size={18} />
            <div>
              <span>Rent & Deposit</span>
              <strong>₹{formData.rent} / ₹{formData.deposit}</strong>
            </div>
          </div>
          <div className={styles.actions}>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Go Back</button>
            <button className="btn btn-primary" onClick={generatePDF}>
              <Download size={18} /> Generate PDF
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.success}>
          <CheckCircle size={48} color="var(--success)" />
          <h4>Agreement Generated!</h4>
          <p>Your draft has been downloaded. You can now print and sign it.</p>
          <button className="btn btn-outline" onClick={() => setStep(1)}>Create Another</button>
        </div>
      )}
    </div>
  );
}
