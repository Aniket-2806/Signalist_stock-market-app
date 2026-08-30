import Link from "next/link";

/**
 * Footer link component that displays text with an embedded hyperlink, typically used for auth page navigation.
 * @param {FooterLinkProps} props - Component props including text, linkText, and href
 * @returns {JSX.Element} Rendered footer link section
 */
const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
    return (
        <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
                {text}{` `}
                <Link href={href} className="footer-link">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}
export default FooterLink