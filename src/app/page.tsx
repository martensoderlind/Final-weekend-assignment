import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Voting Made Simple!</h1>
          <p className="py-6">
            Effortlessly organize elections and vote securely with our app.
            Whether for businesses, communities, or friends – we bring democracy
            to your fingertips."
          </p>
          <button className="btn btn-primary">
            <Link href="\representatives\">Get started</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
