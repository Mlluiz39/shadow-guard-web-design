
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

const barData = [
  { name: "Jan", Contratos: 4000, Renovações: 2400 },
  { name: "Fev", Contratos: 3000, Renovações: 1398 },
  { name: "Mar", Contratos: 2000, Renovações: 9800 },
  { name: "Abr", Contratos: 2780, Renovações: 3908 },
  { name: "Mai", Contratos: 1890, Renovações: 4800 },
  { name: "Jun", Contratos: 2390, Renovações: 3800 },
];

const pieData = [
  { name: "Residencial", value: 400 },
  { name: "Comercial", value: 300 },
  { name: "Industrial", value: 300 },
  { name: "Eventos", value: 200 },
];

const lineData = [
  { name: "Jan", Receita: 4000 },
  { name: "Fev", Receita: 3000 },
  { name: "Mar", Receita: 5000 },
  { name: "Abr", Receita: 2780 },
  { name: "Mai", Receita: 1890 },
  { name: "Jun", Receita: 2390 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security">Dashboard Comercial</h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,832</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+4.3%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Novos Contratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 985.500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2.5%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Renovação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+1.2%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Desempenho de Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Contratos" fill="#3498DB" />
                  <Bar dataKey="Renovações" fill="#2C3E50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Segmentos de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Receita</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Receita" stroke="#3498DB" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
