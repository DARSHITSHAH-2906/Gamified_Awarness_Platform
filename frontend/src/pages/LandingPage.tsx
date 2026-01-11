import React from 'react';
import Navbar from '../components/layout/Navbar';
import { Hero } from '../components/landing/HeroScene';
import { Features } from '../components/landing/Features';
import { TopicsPreview } from '../components/landing/TopicsPreview';
import { CallToAction } from '../components/landing/CallToAction';
import { Footer } from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-x-hidden font-sans">
            <Navbar />
            <Hero />
            <div id="how-it-works">
                <Features />
            </div>
            <div id="topics">
                <TopicsPreview />
            </div>
            <CallToAction />
            <Footer />
        </div>
    );
};

export default LandingPage;
