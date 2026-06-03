import { Metadata } from "next";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalSidebar } from "@/components/legal/legal-sidebar";
import { LegalSection } from "@/components/legal/legal-section";
import { LegalContactCard } from "@/components/legal/legal-contact-card";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { privacyToc, companyInfo, policyDates } from "@/lib/constants/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Atlascub",
  description: "Learn how Atlascub collects, uses, and protects your personal information. Your privacy is important to us.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6">
        <SlugBreadcrumb />
      </div>

      <LegalHero
        title="Privacy Policy"
        description="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information."
        icon="shield"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-72 lg:shrink-0">
            <LegalSidebar items={privacyToc} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Last Updated Note */}
            <div className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Effective Date:</span>{" "}
              {policyDates.effectiveFrom}
            </div>

            {/* Section 1 */}
            <LegalSection id="information-collect" title="1. Information We Collect">
              <p>
                We collect information you provide directly to us, such as when you create
                an account, place an order, or contact customer support. This may include:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely via Razorpay)</li>
                <li>Order history and preferences</li>
                <li>Communications with our support team</li>
                <li>Size and style preferences</li>
              </ul>
              <p className="mt-3">
                We also automatically collect certain information about your device and
                browsing behavior, including IP address, browser type, and pages visited.
              </p>
            </LegalSection>

            {/* Section 2 */}
            <LegalSection id="how-we-use" title="2. How We Use Your Information">
              <p>We use your information to:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Communicate about your order status and updates</li>
                <li>Personalize your shopping experience</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and product offerings</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </LegalSection>

            {/* Section 3 */}
            <LegalSection id="cookies" title="3. Cookies & Tracking Technologies">
              <p>
                We use cookies and similar tracking technologies to enhance your browsing
                experience, analyze site traffic, and personalize content. You can control
                cookie preferences through your browser settings.
              </p>
              <p className="mt-2">
                Types of cookies we use include:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <strong>Essential Cookies:</strong> Required for website functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used for personalized advertising
                </li>
              </ul>
            </LegalSection>

            {/* Section 4 */}
            <LegalSection id="sharing" title="4. Information Sharing">
              <p>
                We do not sell your personal information to third parties. We may share
                your information with:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Service providers (payment processing, shipping, email delivery)</li>
                <li>Law enforcement when required by law</li>
                <li>Business transfers (merger, acquisition, or asset sale)</li>
              </ul>
            </LegalSection>

            {/* Section 5 */}
            <LegalSection id="data-security" title="5. Data Security">
              <p>
                We implement industry-standard security measures to protect your personal
                information, including encryption, secure servers, and access controls.
                However, no method of transmission over the internet is 100% secure.
              </p>
              <p className="mt-2">
                Payment information is processed through <strong>Razorpay</strong>, a
                PCI-DSS compliant payment gateway. We do not store full payment details
                on our servers.
              </p>
            </LegalSection>

            {/* Section 6 */}
            <LegalSection id="user-rights" title="6. Your Rights">
              <p>Under applicable laws, you have the right to:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us at{" "}
                <a href={`mailto:${companyInfo.email}`} className="text-primary">
                  {companyInfo.email}
                </a>
                .
              </p>
            </LegalSection>

            {/* Section 7 */}
            <LegalSection id="third-party" title="7. Third-Party Links">
              <p>
                Our website may contain links to third-party websites. We are not
                responsible for the privacy practices of these sites. We encourage you to
                read their privacy policies.
              </p>
            </LegalSection>

            {/* Section 8 */}
            <LegalSection id="children-privacy" title="8. Children's Privacy">
              <p>
                Our services are not directed to individuals under 18 years of age. We do
                not knowingly collect personal information from children. If we become
                aware of such collection, we will take steps to delete the information.
              </p>
            </LegalSection>

            {/* Section 9 */}
            <LegalSection id="policy-changes" title="9. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of
                any material changes by posting the new policy on this page and updating
                the "Last Updated" date above.
              </p>
            </LegalSection>

            {/* Section 10 */}
            <LegalSection id="contact-us" title="10. Contact Us">
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
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