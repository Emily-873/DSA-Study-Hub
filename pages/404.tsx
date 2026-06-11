import { NotFoundView } from '../src/views/NotFoundView';
import { SEO } from '../src/components/SEO';

export default function Custom404() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist in the DSA Study Hub."
      />
      <NotFoundView />
    </>
  );
}
