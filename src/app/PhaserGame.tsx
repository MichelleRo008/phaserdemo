'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export default function PhaserGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 300 },
          debug: false
        }
      },
      scene: {
        preload: function() {
          this.load.setBaseURL('https://labs.phaser.io');
          this.load.image('sky', 'assets/skies/space3.png');
          this.load.image('logo', 'assets/sprites/phaser3-logo.png');
          this.load.image('red', 'assets/particles/red.png');
        },
        create: function() {
          this.add.image(400, 300, 'sky');
          
          const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
          });
          
          const logo = this.physics.add.image(400, 100, 'logo');
          logo.setVelocity(100, 200);
          logo.setBounce(1, 1);
          logo.setCollideWorldBounds(true);
          
          particles.startFollow(logo);
        }
      }
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  return <div ref={gameRef} style={{ width: '800px', height: '600px' }} />;
}