'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Codificador() {
    const [palavra, setPalavra] = useState('');
    const [codificado, setCodificado] = useState<string[]>([]);
    const [somaTotal, setSomaTotal] = useState<number>(0);

    const mapa: Record<string, number> = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        I: 9,
        J: 9,
        Y: 9,
        K: 10,
        L: 20,
        M: 30,
        N: 40,
        O: 50,
        P: 60,
        Q: 70,
        R: 80,
        S: 90,
        T: 100,
        U: 200,
        W: 200,
        V: 200,
        X: 300,
        Z: 400,
    };

    const codificarPalavra = () => {
        let soma = 0;

        const resultado = palavra
            .normalize('NFD')
            .toUpperCase()
            .split('')
            .map((caractere) => {
                if (caractere === '\u0303') {
                    soma += 40;
                    return '40'; // til
                }

                if (caractere === ' ') return null; // ignora espaço

                const code = caractere.charCodeAt(0);
                if (code >= 0x0300 && code <= 0x036f) {
                    return null; // ignora outros acentos combináveis
                }

                const valor = mapa[caractere];
                if (valor !== undefined) {
                    soma += valor;
                    return valor.toString();
                }

                return null; // ignora outros caracteres não mapeados
            })
            .filter(Boolean);

        setCodificado(resultado as string[]);
        setSomaTotal(soma);
    };

    return (
        <div className="w-full p-4 space-y-6 flex items-center justify-center h-screen">
            <Card className="w-[600px] bg-zinc-50">
                <CardContent className="p-4 space-y-4">
                    <Label>Digite uma palavra:</Label>
                    <Input
                        value={palavra}
                        onChange={(e) => setPalavra(e.target.value)}
                        placeholder="Digite aqui"
                    />

                    <Button onClick={codificarPalavra}>Codificar</Button>

                    {codificado.length > 0 && (
                        <div className="text-lg pt-4 space-y-2">
                            <div>Resultado: {codificado.join(' - ')}</div>
                            <div className="font-semibold">
                                Soma: {somaTotal}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
