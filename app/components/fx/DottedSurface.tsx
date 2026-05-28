'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Capture container locally — refs can be nulled before cleanup, leaking the canvas
		const container = containerRef.current;
		if (!container) return;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x05060f, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x05060f, 0);

		container.appendChild(renderer.domElement);

		const positions: number[] = [];
		const colors: number[] = [];

		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions.push(
					ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
					0,
					iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
				);
				colors.push(0.10, 0.30, 1.0);
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let disposed = false;
		let animationId = 0;

		const animate = () => {
			// Late frame fired after unmount would render into a disposed context
			if (disposed) return;
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const pos = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					pos[i * 3 + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;
					i++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.035;
		};

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize, { passive: true });
		animate();

		return () => {
			disposed = true;
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);

			geometry.dispose();
			material.dispose();
			renderer.dispose();
			// Browsers cap active WebGL contexts (~16). Without forceContextLoss,
			// remounting through SPA navigation can exhaust the pool and the new
			// renderer comes back inert.
			renderer.forceContextLoss();

			const canvas = renderer.domElement;
			canvas.parentNode?.removeChild(canvas);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`pointer-events-none absolute inset-0 -z-10${className ? ` ${className}` : ''}`}
			style={{ background: '#05060F' }}
			aria-hidden="true"
			{...props}
		/>
	);
}
