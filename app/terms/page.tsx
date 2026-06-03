import { Metadata } from "next";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalSidebar } from "@/components/legal/legal-sidebar";
import { LegalSection } from "@/components/legal/legal-section";
import { LegalContactCard } from "@/components/legal/legal-contact-card";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import {
  termsToc,
  companyInfo,
  policyDates,
  businessPolicies,
  shippingInfo,
  paymentMethods,
  legalInfo,
} from "@/lib/constants/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Atlascub",
  description: "Read Atlascub's terms and conditions governing the use of our website, purchases, and services.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6">
        <SlugBreadcrumb />
      </div>

      <LegalHero
        title="Terms of Service"
        description="By accessing or using Atlascub, you agree to be bound by these terms and conditions."
        icon="file"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-72 lg:shrink-0">
            <LegalSidebar items={termsToc} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Effective Date */}
            <div className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Effective Date:</span>{" "}
              {policyDates.effectiveFrom}
            </div>

            {/* Section 1 */}
            <LegalSection id="acceptance" title="1. Acceptance of Terms">
              <p>
                By accessing or using the website{" "}
                <strong>{companyInfo.website}</strong> (the "Site"), you agree to be bound
                by these Terms of Service ("Terms"). If you do not agree to these Terms,
                please do not use the Site.
              </p>
              <p className="mt-2">
                We reserve the right to update or modify these Terms at any time without
                prior notice. Your continued use of the Site constitutes acceptance of any
                such changes.
              </p>
            </LegalSection>

            {/* Section 2 */}
            <LegalSection id="account" title="2. Account Registration">
              <p>
                To place orders, you may need to create an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
              <p className="mt-2">
                You agree to provide accurate, current, and complete information during
                registration and to update it as necessary. We reserve the right to refuse
                service, terminate accounts, or cancel orders at our sole discretion.
              </p>
            </LegalSection>

            {/* Section 3 */}
            <LegalSection id="orders" title="3. Orders & Pricing">
              <p>
                All orders are subject to acceptance and availability. We reserve the right
                to refuse or cancel any order for reasons including but not limited to:
                product availability, errors in pricing, or suspected fraud.
              </p>
              <p className="mt-2">
                <strong>Pricing:</strong> All prices are in Indian Rupees (INR) and are
                inclusive of applicable taxes unless otherwise stated. Prices may change
                without notice, but such changes will not affect confirmed orders.
              </p>
              <p className="mt-2">
                <strong>Cancellation:</strong> You may cancel your order within{" "}
                <strong>{businessPolicies.cancellationWindow}</strong> by contacting our
                support team. Orders already shipped cannot be cancelled.
              </p>
            </LegalSection>

            {/* Section 4 */}
            <LegalSection id="payments" title="4. Payments">
              <p>We accept the following payment methods:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {paymentMethods.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
              <p className="mt-2">
                All payments are processed securely through <strong>Razorpay</strong>. We
                do not store your full payment details on our servers.
              </p>
            </LegalSection>

            {/* Section 5 */}
            <LegalSection id="shipping" title="5. Shipping & Delivery">
              <p>
                <strong>Domestic Shipping:</strong> Orders are typically delivered within{" "}
                <strong>{shippingInfo.domesticShippingTime}</strong>. Metro cities may
                receive delivery in <strong>{shippingInfo.metroCitiesTime}</strong>.
              </p>
              {shippingInfo.internationalShipping && (
                <p className="mt-2">
                  <strong>International Shipping:</strong> International orders typically
                  take <strong>{shippingInfo.internationalShippingTime}</strong>.
                  Customs duties and taxes are the responsibility of the customer.
                </p>
              )}
              <p className="mt-2">
                <strong>Free Shipping:</strong> Orders of ₹
                {shippingInfo.freeShippingThreshold.toLocaleString()} or more qualify for
                free shipping. Otherwise, a shipping fee of ₹
                {shippingInfo.shippingCost} applies.
              </p>
            </LegalSection>

            {/* Section 6 */}
            <LegalSection id="returns" title="6. Returns & Refunds">
              <p>
                We offer returns within{" "}
                <strong>{businessPolicies.returnWindow}</strong> from the date of delivery.
                To be eligible for a return, items must be{" "}
                <strong>{businessPolicies.returnConditions}</strong>.
              </p>
              <p className="mt-2">
                <strong>Returns Process:</strong> Initiate returns through your account
                dashboard. After approval, refunds will be processed within{" "}
                <strong>{businessPolicies.refundTime}</strong> to the original payment
                method.
              </p>
              <p className="mt-2">
                <strong>Exchanges:</strong> {businessPolicies.exchangePolicy}
              </p>
            </LegalSection>

            {/* Section 7 */}
            <LegalSection id="intellectual-property" title="7. Intellectual Property">
              <p>
                All content on this Site, including text, images, logos, and designs, is
                the property of <strong>{companyInfo.legalName}</strong> and is protected
                by Indian and international copyright laws.
              </p>
              <p className="mt-2">
                You may not reproduce, distribute, or create derivative works from any
                content without our express written permission.
              </p>
            </LegalSection>

            {/* Section 8 */}
            <LegalSection id="user-content" title="8. User Content">
              <p>
                By submitting reviews, photos, or other content, you grant us a
                non-exclusive, royalty-free license to use, modify, and display such
                content for marketing and promotional purposes.
              </p>
              <p className="mt-2">
                You represent that you own or have permission to submit the content and
                that it does not violate any third-party rights.
              </p>
            </LegalSection>

            {/* Section 9 */}
            <LegalSection id="prohibited-use" title="9. Prohibited Use">
              <p>You agree not to use the Site for any unlawful purpose or to:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit malware or harmful code</li>
                <li>Interfere with the operation of the Site</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </LegalSection>

            {/* Section 10 */}
            <LegalSection id="limitation-liability" title="10. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, <strong>{companyInfo.legalName}</strong>{" "}
                shall not be liable for any indirect, incidental, or consequential damages
                arising from your use of the Site or purchase of products.
              </p>
              <p className="mt-2">
                Our total liability shall not exceed the amount you paid for the product
                giving rise to the claim.
              </p>
            </LegalSection>

            {/* Section 11 */}
            <LegalSection id="indemnification" title="11. Indemnification">
              <p>
                You agree to indemnify and hold harmless{" "}
                <strong>{companyInfo.legalName}</strong> from any claims, damages, or
                expenses arising from your violation of these Terms or infringement of any
                third-party rights.
              </p>
            </LegalSection>

            {/* Section 12 */}
            <LegalSection id="governing-law" title="12. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws
                of India. Any disputes arising under these Terms shall be subject to the
                exclusive jurisdiction of the courts in{" "}
                <strong>{legalInfo.governingLaw}</strong>.
              </p>
            </LegalSection>

            {/* Section 13 */}
            <LegalSection id="contact" title="13. Contact Information">
              <p>For questions about these Terms, please contact us at:</p>
              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <strong>{companyInfo.legalName}</strong>
                </p>
                <p>{companyInfo.registeredAddress}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${companyInfo.email}`} className="text-primary">
                    {companyInfo.email}
                  </a>
                </p>
              </div>
            </LegalSection>

            {/* Grievance Officer Contact */}
            <LegalContactCard />
          </div>
        </div>
      </div>
    </div>
  );
}