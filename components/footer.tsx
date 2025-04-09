

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ThirdEye AI. all rights reserved.
        </p>
      </div>
    </footer>
  )
}

