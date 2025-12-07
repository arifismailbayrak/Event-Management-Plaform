import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const LegalPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">O</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">OffsiteFlow</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-[250px_1fr] gap-12">
        {/* Sidebar Nav */}
        <div className="hidden md:block">
          <div className="sticky top-32 space-y-4">
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Legal Documents</h3>
            <ul className="space-y-3 text-sm border-l border-slate-200">
              <li><a href="#terms" onClick={(e) => scrollToSection(e, 'terms')} className="block pl-4 border-l-2 border-transparent hover:border-indigo-600 hover:text-indigo-600 text-slate-600 transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" onClick={(e) => scrollToSection(e, 'privacy')} className="block pl-4 border-l-2 border-transparent hover:border-indigo-600 hover:text-indigo-600 text-slate-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-none">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Legal Center</h1>
            <p className="text-slate-500 bg-slate-50 inline-block px-3 py-1 rounded-full text-sm font-medium border border-slate-100">Last Updated: December 6, 2025</p>
          </div>

          {/* PART 1: TERMS OF SERVICE */}
          <section id="terms" className="scroll-mt-32 mb-20">
            <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-sm">1</span> 
              Terms of Service
            </h2>

            <div className="space-y-10 text-slate-600 leading-relaxed text-sm md:text-base">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">1. Acceptance of Terms</h3>
                <p>This SaaS Services Agreement ("Agreement") is entered into between OffsiteFlow ("Company") and you ("Customer"). This Agreement includes and incorporates the Order Form and these Terms and Conditions. By accessing the OffsiteFlow platform, you agree to these terms. There shall be no force or effect to any different terms of any related purchase order or similar form even if signed by the parties after the date hereof.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">2. Services and Support</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">2.1 Provision of Service.</strong> Subject to the terms of this Agreement, Company will use commercially reasonable efforts to provide Customer the Services. Services generally include access to the OffsiteFlow workspace, blueprint wizard, and vendor marketplace.</li>
                  <li><strong className="text-slate-900">2.2 Registration.</strong> As part of the registration process, Customer will identify an administrative user name and password for Customer’s Company account. Company reserves the right to refuse registration of, or cancel passwords it deems inappropriate.</li>
                  <li><strong className="text-slate-900">2.3 Support.</strong> Subject to the terms hereof, Company will provide Customer with reasonable technical support services.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">3. Restrictions and Responsibilities</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">3.1 Usage Restrictions.</strong> Customer will not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Services or any software, documentation or data related to the Services.</li>
                  <li><strong className="text-slate-900">3.2 No Derivations.</strong> Customer may not modify, translate, or create derivative works based on the Services or any Software (except to the extent expressly permitted by Company or authorized within the Services).</li>
                  <li><strong className="text-slate-900">3.3 No Timesharing.</strong> Customer may not use the Services or any Software for timesharing or service bureau purposes or otherwise for the benefit of a third party.</li>
                  <li><strong className="text-slate-900">3.4 Compliance.</strong> Customer represents, covenants, and warrants that Customer will use the Services only in compliance with Company’s standard published policies then in effect and all applicable laws and regulations.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">4. Pilot and Evaluation Use</h3>
                <p>If your Order Form indicates "Pilot Use" or "Evaluation," notwithstanding anything else, in connection with such pilot/evaluation use: (1) no fees will apply, except for any Pilot Use Fee specified; (2) the Services are provided "AS IS" and no warranty obligations of Company will apply; and (3) Customer may terminate this Agreement and all of its rights hereunder by providing Company written notice thereof no less than 10 days prior to the end of the Pilot Period.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">5. Fees, Billing, and Taxes</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">5.1 Payment Terms.</strong> Customer will pay Company the then applicable fees described in the Order Form for the Services in accordance with the terms therein.</li>
                  <li><strong className="text-slate-900">5.2 Billing.</strong> Company may choose to bill through an invoice, in which case, full payment for invoices issued in any given month must be received by Company thirty (30) days after the mailing date of the invoice.</li>
                  <li><strong className="text-slate-900">5.3 Late Payments.</strong> Unpaid amounts are subject to a finance charge of 1.5% per month on any outstanding balance, or the maximum permitted by law, whichever is lower, plus all expenses of collection and may result in immediate termination of Service.</li>
                  <li><strong className="text-slate-900">5.4 Taxes.</strong> Customer shall be responsible for all taxes associated with Services other than U.S. taxes based on Company’s net income.</li>
                  <li><strong className="text-slate-900">5.5 Disputes.</strong> If Customer believes that Company has billed Customer incorrectly, Customer must contact Company no later than 60 days after the closing date on the first billing statement in which the error or problem appeared, in order to receive an adjustment or credit.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">6. Term and Termination</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">6.1 Term.</strong> This Agreement is for the Initial Service Term as specified in the Order Form, and shall be automatically renewed for additional periods of the same duration as the Initial Service Term, unless either party requests termination at least thirty (30) days prior to the end of the then-current term.</li>
                  <li><strong className="text-slate-900">6.2 Termination for Breach.</strong> In addition to any other remedies it may have, either party may also terminate this Agreement upon thirty (30) days notice (or without notice in the case of nonpayment), if the other party materially breaches any of the terms or conditions of this Agreement.</li>
                  <li><strong className="text-slate-900">6.3 Effect of Termination.</strong> Customer will pay in full for the Services up to and including the last day on which the Services are provided. Upon any termination, Company will make all Customer Data available to Customer for electronic retrieval for a period of thirty (30) days, but thereafter Company may, but is not obligated to, delete stored Customer Data.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">7. Warranty and Disclaimer</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">7.1 Service Standards.</strong> Company shall use reasonable efforts consistent with prevailing industry standards to maintain the Services in a manner which minimizes errors and interruptions in the Services.</li>
                  <li><strong className="text-slate-900">7.2 Service Interruptions.</strong> Services may be temporarily unavailable for scheduled maintenance or for unscheduled emergency maintenance. Company does not warrant that the Services will be uninterrupted or error free; nor does it make any warranty as to the results that may be obtained from use of the Services.</li>
                  <li><strong className="text-slate-900">7.3 DISCLAIMER.</strong> EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION, THE SERVICES ARE PROVIDED "AS IS" AND COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">8. Limitation of Liability</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">8.1 Exclusion of Consequential Damages.</strong> NOTWITHSTANDING ANYTHING TO THE CONTRARY, COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE WITH RESPECT TO ANY SUBJECT MATTER OF THIS AGREEMENT UNDER ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY OR OTHER THEORY: (A) FOR ERROR OR INTERRUPTION OF USE OR FOR LOSS OR INACCURACY OR CORRUPTION OF DATA OR COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY OR LOSS OF BUSINESS; (B) FOR ANY INDIRECT, EXEMPLARY, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES.</li>
                  <li><strong className="text-slate-900">8.2 Liability Cap.</strong> COMPANY SHALL NOT BE LIABLE FOR ANY AMOUNTS THAT, TOGETHER WITH AMOUNTS ASSOCIATED WITH ALL OTHER CLAIMS, EXCEED THE FEES PAID BY CUSTOMER TO COMPANY FOR THE SERVICES UNDER THIS AGREEMENT IN THE 12 MONTHS PRIOR TO THE ACT THAT GAVE RISE TO THE LIABILITY.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">9. Miscellaneous</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">9.1 Severability.</strong> If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that this Agreement will otherwise remain in full force and effect and enforceable.</li>
                  <li><strong className="text-slate-900">9.2 Assignment.</strong> This Agreement is not assignable, transferable or sublicensable by Customer except with Company’s prior written consent. Company may transfer and assign any of its rights and obligations under this Agreement without consent.</li>
                  <li><strong className="text-slate-900">9.3 Entire Agreement.</strong> This Agreement is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements.</li>
                  <li><strong className="text-slate-900">9.4 Governing Law.</strong> This Agreement shall be governed by the laws of the State of California without regard to its conflict of laws provisions.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* PART 2: PRIVACY & DATA POLICY */}
          <section id="privacy" className="scroll-mt-32 mb-20">
            <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-sm">2</span> 
              Privacy & Data Policy
            </h2>

            <div className="space-y-10 text-slate-600 leading-relaxed text-sm md:text-base">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">1. Confidentiality</h3>
                <ul className="space-y-3 list-none">
                  <li><strong className="text-slate-900">1.1 Definition.</strong> Each party (the "Receiving Party") understands that the other party (the "Disclosing Party") has disclosed or may disclose business, technical or financial information relating to the Disclosing Party’s business (hereinafter referred to as "Proprietary Information").</li>
                  <li><strong className="text-slate-900">1.2 Scope.</strong> Proprietary Information of Company includes non-public information regarding features, functionality and performance of the Service. Proprietary Information of Customer includes non-public data provided by Customer to Company to enable the provision of the Services ("Customer Data").</li>
                  <li><strong className="text-slate-900">1.3 Protection.</strong> The Receiving Party agrees: (i) to take reasonable precautions to protect such Proprietary Information, and (ii) not to use (except in performance of the Services or as otherwise permitted herein) or divulge to any third person any such Proprietary Information.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">2. Data Ownership and Usage</h3>
                <ul className="space-y-3 list-none">
                   <li><strong className="text-slate-900">2.1 Customer Ownership.</strong> Customer shall own all right, title and interest in and to the Customer Data.</li>
                   <li><strong className="text-slate-900">2.2 Company Ownership.</strong> Company shall own and retain all right, title and interest in and to (a) the Services and Software, all improvements, enhancements or modifications thereto, and (b) all intellectual property rights related to any of the foregoing.</li>
                   <li><strong className="text-slate-900">2.3 Aggregated Data Rights.</strong> Notwithstanding anything to the contrary, Company shall have the right to collect and analyze data and other information relating to the provision, use and performance of various aspects of the Services and related systems and technologies (including, without limitation, information concerning Customer Data and data derived therefrom).</li>
                   <li><strong className="text-slate-900">2.4 Permitted Use of Aggregated Data.</strong> Company will be free (during and after the term hereof) to (i) use such information and data to improve and enhance the Services and for other development, diagnostic and corrective purposes in connection with the Services and other Company offerings, and (ii) disclose such data solely in aggregate or other de-identified form in connection with its business.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-slate-100 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
             <p>© {new Date().getFullYear()} OffsiteFlow Inc. All rights reserved.</p>
             <div className="flex gap-4 mt-4 md:mt-0">
                <a href="mailto:legal@offsiteflow.com" className="hover:text-indigo-600 transition-colors">Contact Legal Team</a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};