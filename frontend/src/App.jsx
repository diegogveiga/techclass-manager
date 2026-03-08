// frontend/App.jsx
import { useState, useEffect } from "react"
import "./App.css"

const API_BASE_URL = "http://localhost:3001"

function App() {
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [showCourses, setShowCourses] = useState(true)
  const [showStudents, setShowStudents] = useState(true)

  // Estados para os formulários de novo item
  const [newCourse, setNewCourse] = useState({ name: '', students: 0, averageGrade: 0.0 })
  const [newStudent, setNewStudent] = useState({ name: '', course: '', grade: '' })

  // Estados para edição
  const [editingCourse, setEditingCourse] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      const coursesRes = await fetch(`${API_BASE_URL}/courses`)
      const coursesData = await coursesRes.json()
      setCourses(coursesData)

      const studentsRes = await fetch(`${API_BASE_URL}/students`)
      const studentsData = await studentsRes.json()
      setStudents(studentsData)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // --- Funções CRUD para Cursos ---
  const handleAddCourse = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse)
      })
      setNewCourse({ name: '', students: 0, averageGrade: 0.0 }) // Limpa o formulário
      fetchData() // Recarrega os dados
    } catch (error) {
      console.error("Erro ao adicionar curso:", error)
    }
  }

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este curso?')) {
      try {
        await fetch(`${API_BASE_URL}/courses/${id}`, { method: 'DELETE' })
        fetchData()
      } catch (error) {
        console.error("Erro ao deletar curso:", error)
      }
    }
  }

  const handleUpdateCourse = async (e) => {
    e.preventDefault()
    if (!editingCourse) return
    try {
      await fetch(`${API_BASE_URL}/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse)
      })
      setEditingCourse(null) // Sai do modo de edição
      fetchData()
    } catch (error) {
      console.error("Erro ao atualizar curso:", error)
    }
  }

  // --- Funções CRUD para Estudantes (análogas às de cursos) ---
  const handleAddStudent = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      })
      setNewStudent({ name: '', course: '', grade: '' })
      fetchData()
    } catch (error) {
      console.error("Erro ao adicionar estudante:", error)
    }
  }

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este estudante?')) {
      try {
        await fetch(`${API_BASE_URL}/students/${id}`, { method: 'DELETE' })
        fetchData()
      } catch (error) {
        console.error("Erro ao deletar estudante:", error)
      }
    }
  }

  const handleUpdateStudent = async (e) => {
    e.preventDefault()
    if (!editingStudent) return
    try {
      await fetch(`${API_BASE_URL}/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent)
      })
      setEditingStudent(null)
      fetchData()
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error)
    }
  }

  const calculateAverageGrade = () => {
    if (students.length === 0) return "0.0"
    return (students.reduce((acc, s) => acc + s.grade, 0) / students.length).toFixed(1)
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: "40px", marginBottom: "30px" }}>
        🎓 TechClass Manager - Por Diego Gomes Veiga
      </h1>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="card">
          <h2>Total de Cursos</h2>
          <p>{courses.length}</p>
        </div>
        <div className="card">
          <h2>Total de Alunos</h2>
          <p>{students.length}</p>
        </div>
        <div className="card">
          <h2>Média Geral</h2>
          <p>{calculateAverageGrade()}</p>
        </div>
      </div>

      {/* SEÇÃO DE CURSOS */}
      <div className="section">
        <h2 onClick={() => setShowCourses(!showCourses)} style={{ cursor: "pointer" }}>
          📚 Cursos {showCourses ? "▲" : "▼"}
        </h2>
        {showCourses && (
          <>
            {/* Formulário para Adicionar/Editar Curso */}
            <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} style={{ marginBottom: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <h3>{editingCourse ? 'Editar Curso' : 'Adicionar Novo Curso'}</h3>
              <input
                type="text"
                placeholder="Nome do Curso"
                value={editingCourse ? editingCourse.name : newCourse.name}
                onChange={(e) => editingCourse
                  ? setEditingCourse({ ...editingCourse, name: e.target.value })
                  : setNewCourse({ ...newCourse, name: e.target.value })
                }
                required
                style={{ marginRight: '10px', padding: '8px' }}
              />
              <input
                type="number"
                placeholder="Nº de Alunos"
                value={editingCourse ? editingCourse.students : newCourse.students}
                onChange={(e) => editingCourse
                  ? setEditingCourse({ ...editingCourse, students: parseInt(e.target.value) || 0 })
                  : setNewCourse({ ...newCourse, students: parseInt(e.target.value) || 0 })
                }
                style={{ marginRight: '10px', padding: '8px', width: '100px' }}
              />
              <input
                type="number"
                step="0.1"
                placeholder="Média"
                value={editingCourse ? editingCourse.averageGrade : newCourse.averageGrade}
                onChange={(e) => editingCourse
                  ? setEditingCourse({ ...editingCourse, averageGrade: parseFloat(e.target.value) || 0.0 })
                  : setNewCourse({ ...newCourse, averageGrade: parseFloat(e.target.value) || 0.0 })
                }
                style={{ marginRight: '10px', padding: '8px', width: '80px' }}
              />
              <button type="submit" style={{ padding: '8px 16px', background: '#1e88e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {editingCourse ? 'Atualizar' : 'Adicionar'}
              </button>
              {editingCourse && (
                <button type="button" onClick={() => setEditingCourse(null)} style={{ padding: '8px 16px', marginLeft: '10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancelar
                </button>
              )}
            </form>

            {/* Tabela de Cursos */}
            <table>
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Alunos</th>
                  <th>Média</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.students}</td>
                    <td>{course.averageGrade}</td>
                    <td>
                      <button onClick={() => setEditingCourse(course)} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer' }}>Editar</button>
                      <button onClick={() => handleDeleteCourse(course.id)} style={{ padding: '4px 8px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* SEÇÃO DE ESTUDANTES */}
      <div className="section">
        <h2 onClick={() => setShowStudents(!showStudents)} style={{ cursor: "pointer", marginTop: '40px' }}>
          👩‍🎓 Alunos {showStudents ? "▲" : "▼"}
        </h2>
        {showStudents && (
          <>
            {/* Formulário para Adicionar/Editar Estudante */}
            <form onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent} style={{ marginBottom: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <h3>{editingStudent ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</h3>
              <input
                type="text"
                placeholder="Nome do Aluno"
                value={editingStudent ? editingStudent.name : newStudent.name}
                onChange={(e) => editingStudent
                  ? setEditingStudent({ ...editingStudent, name: e.target.value })
                  : setNewStudent({ ...newStudent, name: e.target.value })
                }
                required
                style={{ marginRight: '10px', padding: '8px' }}
              />
              <input
                type="text"
                placeholder="Curso"
                value={editingStudent ? editingStudent.course : newStudent.course}
                onChange={(e) => editingStudent
                  ? setEditingStudent({ ...editingStudent, course: e.target.value })
                  : setNewStudent({ ...newStudent, course: e.target.value })
                }
                required
                style={{ marginRight: '10px', padding: '8px', width: '150px' }}
              />
              <input
                type="number"
                placeholder="Nota"
                min="0"
                max="10"
                value={editingStudent ? editingStudent.grade : newStudent.grade}
                onChange={(e) => editingStudent
                  ? setEditingStudent({ ...editingStudent, grade: parseInt(e.target.value) || 0 })
                  : setNewStudent({ ...newStudent, grade: parseInt(e.target.value) || 0 })
                }
                required
                style={{ marginRight: '10px', padding: '8px', width: '80px' }}
              />
              <button type="submit" style={{ padding: '8px 16px', background: '#1e88e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {editingStudent ? 'Atualizar' : 'Adicionar'}
              </button>
              {editingStudent && (
                <button type="button" onClick={() => setEditingStudent(null)} style={{ padding: '8px 16px', marginLeft: '10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancelar
                </button>
              )}
            </form>

            {/* Tabela de Alunos */}
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Curso</th>
                  <th>Nota</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.grade}</td>
                    <td>
                      <button onClick={() => setEditingStudent(student)} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer' }}>Editar</button>
                      <button onClick={() => handleDeleteStudent(student.id)} style={{ padding: '4px 8px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default App