import Link from "next/link";

export default function ResetPasswordPage() {
  return <main className="login-page"><section className="login-card"><Link href="/" className="brand">orbe<span>.</span></Link><p className="eyebrow">RECUPERAÇÃO DE ACESSO</p><h1>Recupere sua senha.</h1><p className="login-copy">Configure o Supabase para habilitar o envio seguro de recuperação por e-mail.</p><Link className="login-help" href="/login">Voltar ao acesso</Link></section></main>;
}
