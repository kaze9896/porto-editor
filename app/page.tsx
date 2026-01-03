import Portfolio from '@/components/Portfolio'
import AboutMe from '@/components/AboutMe'
import Particles from '@/components/Particles'
import GhostCursor from '@/components/GhostCursor'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden relative">
      {/* Background gradient - paling belakang */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" style={{ zIndex: 0 }} />
      
      {/* Particles background - di BELAKANG content sebagai background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={75} 
          particleSpread={10}
          speed={0.08}
          particleBaseSize={120}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Main content - di atas particles */}
      <div className="relative" style={{ zIndex: 10 }}>
        <AboutMe />
        <Portfolio />
      </div>

      {/* Low-visibility ghost cursor overlay */}
      {/* DISABLED FOR PERFORMANCE TEST */}
      {/* <GhostCursor color="#6b8cff" brightness={0.8} zIndex={9999} /> */}
    </div>
  )
}
