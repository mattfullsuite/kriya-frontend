import React, { useState } from 'react';

const Bot = () => {
    
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const toggleIframe = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };
    
    return (
        <div className="fixed bottom-0 right-5">
            <button
            className="mb-5 w-16 h-16 rounded-full bg-[#D9D9D9] text-white flex items-center justify-center shadow-lg hover:bg-[#CC5500] transition duration-300 z-50 relative"
            onClick={toggleIframe}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isChatbotOpen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={isHovered ? (
                        "white"
                    ) : (
                        "#CC5500"
                    )}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            ) : (
                <div>
                    {isHovered ? (
                        <img src="/images/bot-white.png" alt="" />
                    ) : (
                        <img src="/images/bot-colored.png" alt="Kribot" />
                    )}
                </div>
            )}
        </button>
            {isChatbotOpen && (
                <div className="fixed inset-0 z-40 flex items-center pl-40 justify-center ml-96 pt-36">
                     <div className="bg-white p-8 rounded-lg shadow-lg ml-96">
                         <iframe className='h-96 w-full'
                             src="https://widget.writesonic.com/CDN/index.html?service-base-url=https://api.botsonic.ai&token=d0126cfb-15f8-48c1-bfa5-b399b4d056b9&base-origin=https://bot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https://bot.writesonic.com/95a5f0d2-b52e-4fa8-9cf5-25ccd358fc53?t=connect&workspace_id=e06f694b-848e-426d-a26a-9059ee111743" >
                         </iframe>
                     </div>
                 </div>
            )}
        </div>
    );
};

export default Bot;