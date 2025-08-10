export default function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="border-t">
        <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DigitalStore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}