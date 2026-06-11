import { HomeView } from '../src/views/HomeView';
import { SEO } from '../src/components/SEO';


export default function Home({
  navigateTo,
  isNotesOpen,
  setIsNotesOpen,
  completedPrograms,
  handleProgramClick
}: any) {
  return (
    <>
      <SEO 
        title="DSA Study Hub" 
        description="The ultimate platform to learn DSA with interactive visualizations, roadmaps, and practice questions."
      />
      <HomeView
      navigateTo={navigateTo}
      isNotesOpen={isNotesOpen}
      setIsNotesOpen={setIsNotesOpen}
      completedPrograms={completedPrograms}
      handleProgramClick={handleProgramClick}
    />
    </>
  );
}
