import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
)

function GradesChart({ students }) {

if (!students || students.length === 0) {
return <p>Carregando gráfico...</p>
}

const data = {
labels: students.map(s => s.name),
datasets: [
{
label: "Notas dos alunos",
data: students.map(s => s.grade)
}
]
}

return (
<div style={{marginBottom:"40px"}}>
<h2>📊 Desempenho dos Alunos</h2>
<Bar data={data}/>
</div>
)

}

export default GradesChart