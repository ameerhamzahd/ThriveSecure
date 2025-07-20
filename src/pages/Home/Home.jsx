import React from 'react';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import NewsletterSubscription from '../../components/NewsletterSubscription/NewsletterSubscription';
import PopularPolicies from '../../components/PopularPolicies/PopularPolicies';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import LatestArticles from '../../components/LatestArticles/LatestArticles';
import Agents from '../../components/Agents/Agents';

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
                <CustomerReviews></CustomerReviews>
            </div>

            <div>
                <LatestArticles></LatestArticles>
            </div>

            <div>
                <NewsletterSubscription></NewsletterSubscription>
            </div>

            <div>
                <Agents></Agents>
            </div>
        </div>
    );
};

export default Home;