import { useState } from 'react';
import { useProjectStore } from '../../stores/projectStore';
import { useTodoStore } from '../../stores/todoStore';
import { AddProjectModal } from './AddProjectModal';

export const ProjectSidebar = () => {
  const {
    projects,
    selectedProjectId,
    setSelectedProject,
    deleteProject,
    toggleArchive,
    bulkArchiveProjects,
    error: projectError,
    clearError
  } = useProjectStore();
  const { todos } = useTodoStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [isProjectSelectionMode, setIsProjectSelectionMode] = useState(false);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const getProjectTodoCount = (projectId: string) => {
    return todos.filter(todo => todo.projectId === projectId && !todo.completed).length;
  };

  const getUnassignedTodoCount = () => {
    return todos.filter(todo => !todo.projectId && !todo.completed).length;
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    await deleteProject(projectId);
    setDeleteConfirm(null);
  };

  const handleToggleArchive = async (projectId: string, currentStatus: boolean | undefined) => {
    await toggleArchive(projectId, !currentStatus);
  };

  const handleBulkArchive = async (isArchived: boolean) => {
    if (selectedProjectIds.length === 0) return;
    await bulkArchiveProjects(selectedProjectIds, isArchived);
    setSelectedProjectIds([]);
    setIsProjectSelectionMode(false);
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectIds(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const activeProjects = projects.filter(p => !p.isArchived);
  const archivedProjects = projects.filter(p => p.isArchived);
  const displayedProjects = showArchived ? archivedProjects : activeProjects;

  return (
    <>
      <div className="w-full lg:w-80 bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 h-fit lg:sticky lg:top-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Projeler</h2>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setIsProjectSelectionMode(!isProjectSelectionMode);
                setSelectedProjectIds([]);
              }}
              className={`p-2 rounded-lg transition-colors ${isProjectSelectionMode ? 'bg-purple-600 text-white' : 'text-purple-600 hover:bg-purple-50'
                }`}
              title="Projeleri Yönet"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Yeni Proje"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {projectError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 flex items-center justify-between animate-fade-in">
            <span>{projectError}</span>
            <button onClick={() => clearError()} className="p-1 hover:bg-red-100 rounded">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* All Tasks */}
        <button
          onClick={() => setSelectedProject(null)}
          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all mb-2 ${selectedProjectId === null
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
            : 'bg-white/50 hover:bg-white/80 text-gray-700'
            }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${selectedProjectId === null ? 'bg-white/20' : 'bg-gray-100'
              }`}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="font-medium">Tüm Görevler</span>
          </div>
          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${selectedProjectId === null ? 'bg-white/20' : 'bg-gray-100'
            }`}>
            {getUnassignedTodoCount()}
          </span>
        </button>

        {/* Categories / Sections */}
        <div className="flex items-center justify-between mt-6 mb-2 px-1">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Projelerim</span>
          {archivedProjects.length > 0 && (
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md transition-all ${showArchived
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {showArchived ? 'Aktifleri Gör' : `Arşiv (${archivedProjects.length})`}
            </button>
          )}
        </div>

        {/* Bulk Actions for Projects */}
        {isProjectSelectionMode && selectedProjectIds.length > 0 && (
          <div className="mb-4 p-2 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between animate-fade-in">
            <span className="text-[10px] font-bold text-purple-700 ml-2">
              {selectedProjectIds.length} Seçildi
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleBulkArchive(!showArchived)}
                className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                title={showArchived ? "Arşivden Çıkar" : "Arşivle"}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showArchived ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  )}
                </svg>
              </button>
              <button
                onClick={() => {
                  setSelectedProjectIds([]);
                  setIsProjectSelectionMode(false);
                }}
                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                title="İptal"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-2">
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">{showArchived ? 'Arşivlenmiş proje bulunamadı' : 'Henüz proje yok'}</p>
              {!showArchived && <p className="text-xs text-gray-400 mt-1">+ butonuna tıklayarak ekleyin</p>}
            </div>
          ) : (
            displayedProjects.map((project) => (
              <div
                key={project.id}
                className={`group relative flex items-center justify-between p-3 rounded-xl transition-all ${selectedProjectId === project.id
                  ? 'bg-gradient-to-r shadow-md text-white'
                  : 'bg-white/50 hover:bg-white/80 text-gray-700'
                  }`}
                style={
                  selectedProjectId === project.id
                    ? { backgroundImage: `linear-gradient(to right, ${project.color}dd, ${project.color})` }
                    : {}
                }
              >
                <button
                  onClick={() => {
                    if (isProjectSelectionMode) {
                      handleProjectSelect(project.id);
                    } else {
                      setSelectedProject(project.id);
                    }
                  }}
                  className="flex items-center space-x-3 flex-1 text-left"
                >
                  {isProjectSelectionMode && (
                    <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${selectedProjectIds.includes(project.id)
                      ? 'bg-white border-white'
                      : selectedProjectId === project.id ? 'border-white/50' : 'border-gray-300'
                      }`}>
                      {selectedProjectIds.includes(project.id) && (
                        <svg className={`h-3.5 w-3.5 ${selectedProjectId === project.id ? 'text-purple-600' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center text-lg ${selectedProjectId === project.id ? 'bg-white/20' : 'bg-gray-100'
                      }`}
                  >
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{project.name}</p>
                    {project.description && (
                      <p className={`text-xs truncate ${selectedProjectId === project.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                        {project.description}
                      </p>
                    )}
                  </div>
                </button>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${selectedProjectId === project.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                    {getProjectTodoCount(project.id)}
                  </span>
                  {!isProjectSelectionMode && (
                    deleteConfirm === project.id ? (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => handleDeleteProject(e, project.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Onayla"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(null);
                          }}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="İptal"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(project.id);
                        }}
                        className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${selectedProjectId === project.id
                          ? 'text-white/80 hover:bg-white/20'
                          : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                        title="Sil"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )
                  )}

                  {!isProjectSelectionMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleArchive(project.id, project.isArchived);
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${selectedProjectId === project.id
                        ? 'text-white/80 hover:bg-white/20'
                        : project.isArchived
                          ? 'text-amber-500 hover:bg-amber-50'
                          : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      title={project.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {project.isArchived ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        )}
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
};
