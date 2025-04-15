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
    const [somaDigitos, setSomaDigitos] = useState<number>(0);

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

    const somarDigitosAte22 = (valor: number): number => {
        let soma = valor;

        while (soma > 22) {
            soma = soma
                .toString()
                .split('')
                .reduce((acc, dig) => acc + Number(dig), 0);
        }

        return soma;
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
                    return '40';
                }

                if (caractere === ' ') return null;

                const code = caractere.charCodeAt(0);
                if (code >= 0x0300 && code <= 0x036f) return null;

                const valor = mapa[caractere];
                if (valor !== undefined) {
                    soma += valor;
                    return valor.toString();
                }

                return null;
            })
            .filter(Boolean);

        const somaFinal = somarDigitosAte22(soma);

        setCodificado(resultado as string[]);
        setSomaTotal(soma);
        setSomaDigitos(somaFinal);
    };

    const resetar = () => {
        setPalavra('');
        setCodificado([]);
        setSomaTotal(0);
        setSomaDigitos(0);
    };

    return (
        <div className="w-full p-4 space-y-16 flex flex-col items-center justify-center h-screen">
            <h1 className="text-zinc-50 md:text-2xl text-xl font-bold">
                O Terreiro de Jagun - Jogo de Búzios
            </h1>
            <Card className="md:w-[600px] w-full bg-zinc-50">
                <CardContent className="p-4 space-y-4">
                    <Label>
                        Digite o nome de batismo (excluindo Júnior, Filho e
                        Neto):
                    </Label>
                    <Input
                        value={palavra}
                        onChange={(e) => setPalavra(e.target.value)}
                        placeholder="Ex: Fulado da Silva"
                    />

                    <div className="flex gap-2">
                        <Button
                            onClick={codificarPalavra}
                            className="cursor-pointer"
                        >
                            Calcular
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetar}
                            className="cursor-pointer"
                        >
                            Resetar
                        </Button>
                    </div>

                    {codificado.length > 0 && (
                        <div className="text-lg pt-4 space-y-2">
                            <div>Resultado: {codificado.join(' - ')}</div>
                            <div className="font-semibold">
                                Soma: {somaTotal}
                            </div>
                            <div className="font-semibold">
                                Perfil: {somaDigitos}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
