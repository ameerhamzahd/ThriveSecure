import React from 'react';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';

const Home = () => {
    return (
        <div>
            <div>
                <BannerSlider></BannerSlider>
            </div>

            <div>
                <BenefitsSection></BenefitsSection>
            </div>
        </div>
    );
};

export default Home;