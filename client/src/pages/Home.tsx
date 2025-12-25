import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Gamepad2, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchSheetData = async () => {
      setLoading(true);
      try {
        // Convert Google Sheets URL to CSV export
        const sheetId = "1yYx0LPrmg3p2EEw2is6kENiefOYvQm5n";
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
        
        const response = await fetch(csvUrl);
        const csv = await response.text();
        
        // Parse CSV
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map(h => h.trim());
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(",").map(v => v.trim());
            const row: any = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || "";
            });
            return row;
          });
        
        setSheetData(data);
      } catch (error) {
        console.error("Erro ao carregar planilha:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  const cotaPrice = 20;
  const totalCotas = sheetData.reduce((sum, row) => {
    const cotas = parseInt(row["Cotas"] || row["cotas"] || "0") || 0;
    return sum + cotas;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Instituto Cria-Atividade
              </h1>
              <p className="text-slate-600 text-sm mt-1">Bolão Solidário da Mega-Sena da Virada 🎉</p>
            </div>
            <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-base">
              R$ {cotaPrice}/cota
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-sm">
            <TabsTrigger value="inicio" className="text-base">
              Início
            </TabsTrigger>
            <TabsTrigger value="cotas" className="text-base">
              Cotas
            </TabsTrigger>
            <TabsTrigger value="jogos" className="text-base">
              Jogos Feitos
            </TabsTrigger>
          </TabsList>

          {/* TAB: INÍCIO */}
          <TabsContent value="inicio" className="space-y-6">
            {/* Hero Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-3xl text-orange-600">🎊 Bem-vindo ao Bolão da Mega da Virada</CardTitle>
                <CardDescription className="text-base mt-2">
                  O Instituto Cria-Atividade realiza seu bolão de final de ano com transparência, organização e espírito colaborativo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Info Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <DollarSign className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">Valor da Cota</p>
                      <p className="text-orange-600 font-bold text-lg">R$ {cotaPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">Total de Cotas</p>
                      <p className="text-blue-600 font-bold text-lg">{totalCotas}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">Transparência</p>
                      <p className="text-indigo-600 font-bold text-lg">100%</p>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-slate-900">Objetivos do Bolão:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3 text-slate-700">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      <span>Participar da <strong>Mega-Sena da Virada</strong></span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-700">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      <span>Gestão clara de números e cotas</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-700">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      <span>Auditoria aberta para todos os participantes</span>
                    </li>
                  </ul>
                </div>

                {/* Navigation Guide */}
                <div className="bg-slate-100 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-slate-900">Navegue pelas abas acima para:</p>
                  <ul className="space-y-1 text-slate-700">
                    <li>✔️ Ver e controlar as cotas dos participantes</li>
                    <li>✔️ Acompanhar os jogos realizados</li>
                    <li>✔️ Garantir total transparência</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: COTAS */}
          <TabsContent value="cotas" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">💰 Controle de Cotas</CardTitle>
                <CardDescription>
                  Planilha de cotas dos participantes - Cada cota custa R$ {cotaPrice}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin">
                      <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full"></div>
                    </div>
                  </div>
                ) : sheetData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-orange-600">
                          {Object.keys(sheetData[0]).map((header) => (
                            <th
                              key={header}
                              className="px-4 py-3 text-left font-semibold text-slate-900 bg-orange-50"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sheetData.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            {Object.values(row).map((value, cellIdx) => (
                              <td
                                key={cellIdx}
                                className="px-4 py-3 text-slate-700"
                              >
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <p>Nenhum dado disponível no momento</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: JOGOS FEITOS */}
          <TabsContent value="jogos" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">🎮 Jogos Feitos</CardTitle>
                <CardDescription>
                  Registro de todos os jogos realizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Gamepad2 className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 text-lg">Nenhum jogo registrado ainda</p>
                  <p className="text-slate-400 text-sm mt-2">Os jogos realizados aparecerão aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-8 text-center text-slate-600">
          <p>© 2025 Instituto Cria-Atividade — Transparência e Impacto Social</p>
        </div>
      </footer>
    </div>
  );
}
