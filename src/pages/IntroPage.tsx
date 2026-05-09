import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicIntro from '../components/CinematicIntro';

function isMobileLike(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const narrow = window.matchMedia?.('(max-width: 768px)')?.matches ?? false;
  return coarse || narrow;
}

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobileLike()) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  return (
    <CinematicIntro onComplete={() => navigate('/home', { replace: true })} />
  );
}