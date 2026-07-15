import { useState } from 'react'
import { projects } from '../../data/projects'
import { CountdownTimer } from '../CountdownTimer/CountdownTimer'
import FaqComp from '../Faq/FaqComp'
import ModalFlow from '../ModalFlow/ModalFlow'
import MortgageCalculator from '../MortgageCalculator/MCalculator'
import UndoableCounter from '../UndoableCounter/UndoableCounter'
import ShoppingList from '../ShoppingList/ShoppingList'
import './Home.css'

export const Home = () => {
  const [selectedId, setSelectedId] = useState(projects[0]?.id)

  const selectedProject =
    projects.find(project => project.id === selectedId) ??
    projects[0]

  const componentMap: Record<number, React.ReactNode> = {
    1: <CountdownTimer />,
    2: <FaqComp />,
    3: <ModalFlow />,
    4: <MortgageCalculator />,
    5: <UndoableCounter />,
    6: <ShoppingList />
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <span className="eyebrow">
            Kapil Hans - Sr. React Developer
        </span>

        <h1>
          React Mini Projects Hub
        </h1>
      </header>

      <div className="home-layout">
        <aside className="home-sidebar">
          <div className="sidebar-header">
            <h3>{projects.length} Projects</h3>
          </div>

          <div className="sidebar-list">
            {projects.map(project => (
              <button
                key={project.id}
                type="button"
                className={`sidebar-item ${
                  selectedId === project.id ? 'active' : ''
                }`}
                onClick={() =>
                  setSelectedId(project.id)
                }
              >
                <span className="sidebar-icon">
                  {project.icon}
                </span>

                <div className="sidebar-content">
                  <span>{project.name}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="home-main">
          <section className="project-card">
            <div className="project-card-head">
              <span className="section-label">
                Project Preview
              </span>
            </div>

            <div className="project-preview-title">
              <div>
                <h2>{selectedProject.name}</h2>
              </div>
            </div>

            <div className="preview-frame">
              {componentMap[selectedId]}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}