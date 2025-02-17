/**
 * Footer component that displays copyright information and legal links.
 * Automatically updates the copyright year.
 * 
 * @returns {JSX.Element} The rendered footer
 */
export function Footer() {
  return (
    <footer className="border-t mt-auto w-full">
      <div className="max-w-[1240px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Quantinium. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}