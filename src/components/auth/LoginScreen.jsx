import React, { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoginScreen = () => {
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
                alert("Conta criada! Verifique seu e-mail para confirmar a conta antes de entrar.");
            }
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-blue-100">
            <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-[2rem] shadow-2xl border border-slate-100 animate-in zoom-in-95">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-4 rounded-3xl mb-4 text-white shadow-xl shadow-blue-200">
                        <Heart className="w-8 h-8" fill="currentColor" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
                        Role <span className="text-blue-600">Finder</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm mt-2 text-center">
                        Um espaço só de vocês.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold text-center">
                            {errorMsg}
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">E-mail do Casal</label>
                        <input
                            type="email"
                            required
                            placeholder="casal@exemplo.com"
                            className="w-full bg-slate-50 rounded-2xl px-5 py-4 outline-none font-bold text-sm border border-transparent focus:border-blue-500 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Senha Mágica</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-50 rounded-2xl px-5 py-4 outline-none font-bold text-sm border border-transparent focus:border-blue-500 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex justify-center items-center mt-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Entrar' : 'Criar Conta')}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-400 font-bold text-xs hover:text-slate-900 transition-colors"
                    >
                        {isLogin ? 'Ainda não têm um espaço? Criar agora.' : 'Já têm uma conta? Entrar.'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
