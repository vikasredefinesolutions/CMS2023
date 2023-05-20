const SocialShare = () => {
  return (
    <section className='mainsection col-span-12'>
      <div className='container px-4 mx-auto flex w-full justify-center'>
        <div className='sharethis-inline-share-buttons'></div>
        <a href="//pinterest.com/pin/create/button?url=&media=&description=" className="st-center st-has-labels st-animated ml-2" data-pin-custom="true" target="_blank" id="st-1">
			<div className="st-btn" style={{display: "inline-block", backgroundColor: "#CB2027" }}>
		  		<img alt="pinterest sharing button" src="https://platform-cdn.sharethis.com/img/pinterest.svg" />
		  		<span className="st-label">Pin</span>
			</div>
		</a>
      </div>
    </section>
  );
};

export default SocialShare;
