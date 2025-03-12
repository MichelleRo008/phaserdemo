'use client';

import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

export default function PhaserGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const boxRef = useRef<Phaser.Physics.Arcade.Image | null>(null);
  const [boxColor, setBoxColor] = useState(0xffffff);

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
          this.load.image('box', 'assets/sprites/block.png');
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
          
          const box = this.physics.add.image(200, 450, 'box');
          box.setVelocity(50, -100);
          box.setBounce(0.8, 0.8);
          box.setCollideWorldBounds(true);
          boxRef.current = box;
          
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

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.setTint(boxColor);
    }
  }, [boxColor]);

  const changeBoxColor = () => {
    const colors = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    const currentIndex = colors.indexOf(boxColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setBoxColor(colors[nextIndex]);
  };

  return (
    <div>
      <div ref={gameRef} style={{ width: '800px', height: '600px' }} />
      <button 
        onClick={changeBoxColor}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Change Box Color
      </button>
    </div>
  );
}