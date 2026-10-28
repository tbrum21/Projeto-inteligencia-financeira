import Link from "next/link";
import { signIn } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;
  return (
    <main className="login-page">
      <section className="login-card">
        <Link href="/" className="brand">orbe<span>.</span></Link>
        <p className="eyebrow">ACESSO PRIVADO</p>
        <h1>Entre na sua carteira.</h1>
        <p className="login-copy">Dados de investimento ficam disponíveis somente na sua sessão autenticada.</p>
        {error ? <p className="login-error" role="alert">{error}</p> : null}
        <form action={signIn} className="login-form">
          <input type="hidden" name="next" value={next ?? "/dashboard"} />
          <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
          <label>Senha<input name="password" type="password" autoComplete="current-password" required /></label>
          <button type="submit" className="primary-action">Entrar</button>
        </form>
        <Link className="login-help" href="/reset-password">Esqueci minha senha</Link>
      </section>
    </main>
  );
}
