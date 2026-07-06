import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import { Button } from "../components/ui/Button";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { IconButton } from "../components/ui/IconButton";
import * as Icons from "../components/icons";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

const ArrowLeft = Icons.ArrowLeft;
const Home = Icons.Home;

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Display Advertising');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    // Go back in browser history, or to home if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />
      <div className="flex-1 flex items-center justify-center" style={{
        backgroundColor: 'var(--ld-semantic-color-background-subtle, #f8f8f8)'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: '48px'
        }}>
          {/* 404 Icon/Number */}
          <div style={{
            fontSize: '120px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text-subtlest)',
            marginBottom: '24px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            lineHeight: '1'
          }}>
            404
          </div>

          {/* Error Message */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '16px',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            Page Not Found
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--ld-semantic-color-text-subtle)',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Path Info */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '6px',
            marginBottom: '32px',
            fontSize: '14px',
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            color: 'var(--ld-semantic-color-text-subtle)',
            wordBreak: 'break-all'
          }}>
            {location.pathname}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="secondary"
              size="large"
              onClick={handleGoBack}
            >
              <ArrowLeft style={{ width: 20, height: 20, marginRight: 8 }} />
              Go Back
            </Button>
            <IconButton
              aria-label="Go to home page"
              variant="primary"
              size="large"
              onClick={handleGoHome}
            >
              <Home style={{ width: 24, height: 24 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
