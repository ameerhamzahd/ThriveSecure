import React from 'react';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import NewsletterSubscription from '../../components/NewsletterSubscription/NewsletterSubscription';

const Home = () => {
    return (
        <div>
            <div>
                <BannerSlider></BannerSlider>
            </div>

            <div>
                <BenefitsSection></BenefitsSection>
            </div>

            <div>
                <NewsletterSubscription></NewsletterSubscription>
            </div>
        </div>
    );
};

export default Home;