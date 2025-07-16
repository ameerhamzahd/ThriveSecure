import React from 'react';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import NewsletterSubscription from '../../components/NewsletterSubscription/NewsletterSubscription';
import PopularPolicies from '../../components/PopularPolicies/PopularPolicies';

const Home = () => {
    return (
        <div>
            <div>
                <BannerSlider></BannerSlider>
            </div>

            <div>
                <PopularPolicies></PopularPolicies>
            </div>

            <div>
                <NewsletterSubscription></NewsletterSubscription>
            </div>
        </div>
    );
};

export default Home;