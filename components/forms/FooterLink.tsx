import Link from "next/link";

/**
 * Footer link component for auth forms displaying text with an embedded link.
 * Used for navigation between sign-in and sign-up pages.
 *
 * @param props - Footer link properties
 * @param props.text - Main text to display before the link
 * @param props.linkText - Clickable link text
 * @param props.href - URL to navigate to when link is clicked
 * @returns Rendered footer text with embedded link
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