const MeasuringGuide = () => {
  const showTab = (id) => {
    if (typeof window !== 'undefined') {
      let x = document.querySelector('#tabpart');
      if (id == 1) {
        x.querySelectorAll('#tablink1')[0].classList.add('bg-light-gray');
        x.querySelectorAll('#tab1')[0].classList.remove('hidden');
        x.querySelectorAll('#tab2')[0].classList.add('hidden');
        x.querySelectorAll('#tab3')[0].classList.add('hidden');
        x.querySelectorAll('#tablink2')[0].classList.remove('bg-light-gray');
        x.querySelectorAll('#tablink3')[0].classList.remove('bg-light-gray');
      } else if (id == 2) {
        x.querySelectorAll('#tablink1')[0].classList.remove('bg-light-gray');
        x.querySelectorAll('#tablink2')[0].classList.add('bg-light-gray');
        x.querySelectorAll('#tablink3')[0].classList.remove('bg-light-gray');
        x.querySelectorAll('#tab2')[0].classList.remove('hidden');
        x.querySelectorAll('#tab3')[0].classList.add('hidden');
        x.querySelectorAll('#tab1')[0].classList.add('hidden');
      } else {
        x.querySelectorAll('#tablink1')[0].classList.remove('bg-light-gray');
        x.querySelectorAll('#tablink3')[0].classList.add('bg-light-gray');
        x.querySelectorAll('#tablink2')[0].classList.remove('bg-light-gray');
        x.querySelectorAll('#tab3')[0].classList.remove('hidden');
        x.querySelectorAll('#tab2')[0].classList.add('hidden');
        x.querySelectorAll('#tab1')[0].classList.add('hidden');
      }
    }
  };
  return (
    <>
      <section className='pt-[40px]'>
        <div className='container mx-auto'>
          <div className='text-2xl-text text-center'>MEASURING GUIDE</div>
        </div>
      </section>
      <section className='container mx-auto mt-[50px] mb-[50px]' id='tabpart'>
        <div className=''>
          <div className=''>
            <div x-data='{activeTab:01}' className='mt-[50px] mb-[50px]'>
              <ul className='flex justify-center flex-wrap items-center border-b border-gray-border'>
                <li className=''>
                  <a
                    href='javascript:void(0);'
                    id='tablink1'
                    className='bg-light-gray tab block uppercase font-[600] text-medium-text max-w-[150px] bg-light-gray'
                    onClick={(event) => {
                      showTab(1);
                    }}
                  >
                    <img
                      className='max-h-full'
                      src='/assets/images/PKhealth/patagonia.png'
                      alt=''
                    />
                  </a>
                </li>
                <li className=''>
                  <a
                    href='javascript:void(0);'
                    id='tablink2'
                    className='tab block uppercase font-[600] text-medium-text max-w-[150px]'
                    onClick={(event) => {
                      showTab(2);
                    }}
                  >
                    <img
                      className='max-h-full'
                      src='/assets/images/PKhealth/nike-1.png'
                      alt=''
                    />
                  </a>
                </li>
                <li className=''>
                  <a
                    href='javascript:void(0);'
                    id='tablink3'
                    className='tab block uppercase font-[600] text-medium-text max-w-[150px]'
                    onClick={(event) => {
                      showTab(3);
                    }}
                  >
                    <img
                      className='max-h-full'
                      src='https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/brand/logo_76_7.png'
                      alt=''
                    />
                  </a>
                </li>
              </ul>
              <div className='mx-auto pt-[20px]'>
              <div className="panel-01 tab-content pb-4" id="tab1">
                                <div className="mb-[20px]">
                                    <div className="text-large-text text-center mb-[20px] uppercase">Men's Tops and Jackets
                                        Sizing Information</div>
                                </div>
                                <div className="text-default-text">
                                    <div className="pb-[15px]">
                                        <p><strong>Measurements are in inches, unless otherwise noted.</strong></p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full text-default-text border border-gray-border" cellspacing="0" cellpadding="0">
                                            <thead className="text-default-text font-semibold border-b border-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <th className="w-full p-2 text-left" colspan="4">Body Measurements</th>
                                                </tr>
                                                <tr className="divide-x divide-gray-border border-t border-b border-gray-border">
                                                    <th className="w-1/4 p-2 text-left">Size</th>
                                                    <th className="w-1/4 p-2 bg-[#f5f5f6] text-left"><strong>Chest*</strong></th>
                                                    <th className="w-1/4 p-2 bg-[#f5f5f6] text-left"><strong>Low Hip</strong></th>
                                                    <th className="w-1/4 p-2 bg-[#f5f5f6] text-left"><strong>Arm Length</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>XX-Small</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">33</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">30</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>X-Small</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">35</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">34</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">32</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>Small</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">37</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">36</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">33</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>Medium</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">40</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">39</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">33</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>Large</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">44</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">43</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">35</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>X-Large</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">47</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">46</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">36</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>XX-Large</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">50</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">49</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">37</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2"><strong>XXX-Large</strong></td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">56</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">55</td>
                                                    <td className="w-1/4 p-2 bg-[#f5f5f6]">38</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="pt-[20px]">*TOPS - Chest is generally the best size predictor. However, if
                                        your Low Hips are larger than the size indicated by your Chest, and the garment
                                        will cover your Low Hips, consider buying the size indicated for your Low Hips.
                                    </p>
                                </div>
                                <div className="pb-[20px] pt-[20px] text-default-text">
                                    <p><strong>Fit Guide</strong></p>
                                    <p>Though each Patagonia® product is designed and shaped specifically for its
                                        intended use, we can generalize our fit descriptions in four ways:</p>
                                    <div className="flex flex-wrap pt-[10px] ">
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-mens-fitted.jpg" alt="Form fitting" title="Form fitting" /></div>
                                            <p><strong>Formfitting</strong></p>
                                            <p>Conforms to the body’s contours.</p>
                                        </div>
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-mens-slim.jpg" alt="Slim Fit" title="Slim Fit" /></div>
                                            <p><strong>Slim Fit</strong></p>
                                            <p>Closer-fitting. Slim-fitting technical garments may be worn over
                                                baselayers and light midlayers.</p>
                                        </div>
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-mens-regular.jpg" alt="Regular Fit" title="Regular Fit" /></div>
                                            <p><strong>Regular Fit</strong></p>
                                            <p>Neither slim nor oversized. Regular-fitting technical garments may be
                                                worn over heavier midlayers.</p>
                                        </div>
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-mens-relaxed.jpg" alt="Relaxed Fit" title="Relaxed Fit" /></div>
                                            <p><strong>Relaxed Fit</strong></p>
                                            <p>Drapes loosely on the body.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-[20px] pt-[20px] text-default-text">
                                    <p><strong>How to Measure</strong></p>
                                    <p><strong>Sleeve</strong></p>
                                    <p>With elbow bent, measure from the center (back) of neck to elbow and down to
                                        wrist.</p>
                                    <p><strong>Chest/Bust</strong></p>
                                    <p>Measure around your chest/bust, just under armpit.</p>
                                    <p><strong>Waist</strong></p>
                                    <p>Measure around waist at the smallest circumference.</p>
                                    <p><strong>Hips</strong></p>
                                    <p>Stand, feet together, and measure around the largest circumference at hips.</p>
                                    <p><strong>Hands</strong></p>
                                    <p>Measure around the fullest part of the hand, not including thumb.</p>
                                    <p><strong>Inseam</strong></p>
                                    <p>Take a pair of pants that fit well and measure from the crotch to bottom of leg.
                                        All pants come with a finished hem.</p>
                                    <p className="mt-[20px]"><em>Measurements refer to body size, not garment dimensions,
                                            and are in inches unless otherwise noted.</em></p>
                                </div>
                                <div className="mb-[20px] mt-[20px]">
                                    <div className="text-large-text text-center mb-[20px] uppercase">Women's Sizing - Tops
                                        and Bottoms</div>
                                </div>
                                <div className="text-default-text">
                                    <div className="pb-[15px]">
                                        <p><strong>Measurements are in inches, unless otherwise noted.</strong></p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full text-default-text border border-gray-border" cellspacing="0" cellpadding="0">
                                            <thead className="text-default-text font-semibold border-b border-gray-border">
                                                <tr className="divide-x divide-gray-border border-t border-b border-gray-border">
                                                    <th className="p-2 w-1/12">&nbsp;</th>
                                                    <th className="p-2 w-1/12">&nbsp;</th>
                                                    <th className="p-2 w-1/12">&nbsp;</th>
                                                    <th colspan="3" className="p-2 bg-[#f5f5f6] text-left"><strong>Body
                                                            Measurements</strong></th>
                                                    <th className="p-2">&nbsp;</th>
                                                    <th colspan="4" className="p-2 bg-[#f5f5f6] text-left"><strong>Garment
                                                            Measurements</strong></th>
                                                </tr>
                                                <tr className="divide-x divide-gray-border border-t border-b border-gray-border">
                                                    <th className="p-2">&nbsp;</th>
                                                    <th className="p-2">&nbsp;</th>
                                                    <th className="p-2">&nbsp;</th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Chest*</strong></th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Waist</strong></th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Low Hip**</strong></th>
                                                    <th className="p-2">&nbsp;</th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Standard Inseam***</strong>
                                                    </th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Short Inseam</strong></th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Regular Inseam</strong></th>
                                                    <th className="p-2 bg-[#f5f5f6] text-left"><strong>Long Inseam</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>XXS</strong></td>
                                                    <td className="p-2">00</td>
                                                    <td className="p-2">24</td>
                                                    <td className="p-2 bg-[#f5f5f6]">31</td>
                                                    <td className="p-2 bg-[#f5f5f6]">24.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">0</td>
                                                    <td className="p-2">25</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">25.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">31</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>XS</strong></td>
                                                    <td className="p-2">2</td>
                                                    <td className="p-2">26</td>
                                                    <td className="p-2 bg-[#f5f5f6]">33</td>
                                                    <td className="p-2 bg-[#f5f5f6]">26.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">36</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">31</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">4</td>
                                                    <td className="p-2">27</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                    <td className="p-2 bg-[#f5f5f6]">27.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">37</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>S</strong></td>
                                                    <td className="p-2">6</td>
                                                    <td className="p-2">28</td>
                                                    <td className="p-2 bg-[#f5f5f6]">35</td>
                                                    <td className="p-2 bg-[#f5f5f6]">28.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">38</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">8</td>
                                                    <td className="p-2">29</td>
                                                    <td className="p-2 bg-[#f5f5f6]">36</td>
                                                    <td className="p-2 bg-[#f5f5f6]">29.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">39</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>M</strong></td>
                                                    <td className="p-2">10</td>
                                                    <td className="p-2">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">37</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">40</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">12</td>
                                                    <td className="p-2">31</td>
                                                    <td className="p-2 bg-[#f5f5f6]">38.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">41.5</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>L</strong></td>
                                                    <td className="p-2">14</td>
                                                    <td className="p-2">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">40</td>
                                                    <td className="p-2 bg-[#f5f5f6]">33.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">43</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">16</td>
                                                    <td className="p-2">33</td>
                                                    <td className="p-2 bg-[#f5f5f6]">42</td>
                                                    <td className="p-2 bg-[#f5f5f6]">35.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">45</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>XL</strong></td>
                                                    <td className="p-2">18</td>
                                                    <td className="p-2">34</td>
                                                    <td className="p-2 bg-[#f5f5f6]">44</td>
                                                    <td className="p-2 bg-[#f5f5f6]">37.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">47</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2">20</td>
                                                    <td className="p-2">35</td>
                                                    <td className="p-2 bg-[#f5f5f6]">46</td>
                                                    <td className="p-2 bg-[#f5f5f6]">39.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">49</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2"><strong>XXL</strong></td>
                                                    <td className="p-2">22</td>
                                                    <td className="p-2">36</td>
                                                    <td className="p-2 bg-[#f5f5f6]">48</td>
                                                    <td className="p-2 bg-[#f5f5f6]">41.5</td>
                                                    <td className="p-2 bg-[#f5f5f6]">51</td>
                                                    <td className="p-2">&nbsp;</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">30</td>
                                                    <td className="p-2 bg-[#f5f5f6]">32</td>
                                                    <td className="p-2 bg-[#f5f5f6]">34</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="pt-[30px]">*TOPS - Chest is generally the best size predictor. However, if
                                        your Low Hips are larger than the size indicated by your Chest, and the garment
                                        will cover your Low Hips, consider buying the size indicated for your Low Hips.
                                    </p>
                                    <p>**BOTTOMS - Low Hip is usually the best size predictor. However, if your Natural Waist is larger than the size
                                        indicated for your Low Hip measurement, consider buying the size indicated by your Natural Waist.</p>
                                    <p>***STANDARD INSEAM may vary by product. Please see product page.</p>
                                </div>
                                <div className="pb-[20px] pt-[20px] text-default-text">
                                    <p><strong>Fit Guide</strong></p>
                                    <p>Though each Patagonia® product is designed and shaped specifically for its intended use, we can generalize our fit descriptions in four ways:</p>
                                    <div className="flex flex-wrap pt-[10px] ">
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-womens-fitted.jpg" alt="Form fitting" title="Form fitting" /></div>
                                            <p><strong>Formfitting</strong></p>
                                            <p>Conforms to the body’s contours.</p>
                                        </div>
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-womens-slim.jpg" alt="Slim Fit" title="Slim Fit" /></div>
                                            <p><strong>Slim Fit</strong></p>
                                            <p>Closer-fitting. Slim-fitting technical garments may be worn over baselayers and light midlayers.</p>
                                        </div>
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-womens-regula.jpg" alt="Regular Fit" title="Regular Fit" /></div>
                                            <p><strong>Regular Fit</strong></p>
                                            <p>Neither slim nor oversized. Regular-fitting technical garments may be worn over heavier midlayers.</p>
                                        </div>
                                        <div className="w-full lg:w-1/4 md:w-1/2">
                                            <div className="w-full"><img src="https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/7/images/size-chart-graphic-womens-relaxe.jpg" alt="Relaxed Fit" title="Relaxed Fit" /></div>
                                            <p><strong>Relaxed Fit</strong></p>
                                            <p>Drapes loosely on the body.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-[20px] pt-[20px] text-default-text">
                                    <p><strong>How to Measure</strong></p>
                                    <p><strong>Sleeve</strong></p>
                                    <p>With elbow bent, measure from the center (back) of neck to elbow and down to wrist.</p>
                                    <p><strong>Chest/Bust</strong></p>
                                    <p>Measure around your chest/bust, just under armpit.</p>
                                    <p><strong>Waist</strong></p>
                                    <p>Measure around waist at the smallest circumference.</p>
                                    <p><strong>Hips</strong></p>
                                    <p>Stand, feet together, and measure around the largest circumference at hips.</p>
                                    <p><strong>Hands</strong></p>
                                    <p>Measure around the fullest part of the hand, not including thumb.</p>
                                    <p><strong>Inseam</strong></p>
                                    <p>Take a pair of pants that fit well and measure from the crotch to bottom of leg. All pants come with a finished hem.</p>
                                    <p className="mt-[20px]"><em>Measurements refer to body size, not garment dimensions, and are in inches unless otherwise noted.</em></p>
                                </div>
                            </div>
                <div className='panel-02 tab-content pb-4 hidden' id='tab2'>
                  <div className='text-large-text text-center mb-[20px]'>
                    NIKE SIZE CHART
                  </div>
                  <div className='text-tilte-text mb-[10px]'>MEN'S TOPS</div>
                  <div className='text-default-text mb-[10px]'>
                    <strong>MEASURE YOURSELF</strong>
                  </div>
                  <div className='mb-[50px]'>
                    <img src='/assets/images/PKhealth/nike-men.jpg' />
                  </div>
                  <div className='text-default-text mb-[10px]'>
                    <strong>FIND YOUR SIZE</strong>
                  </div>
                  <div className='mb-[30px]'>
                    Use the chart below to determine your size. If you're on the
                    borderline between two sizes, order the smaller size for a
                    tighter fit or the larger size for a looser fit. If your
                    measurements for chest and waist correspond to two different
                    suggested sizes, order the size indicated by your chest
                    measurement.
                  </div>
                  <div className='text-tilte-text mb-[10px]'>
                    SIZE CHART: REGULAR (5'7"-6'0"/170-183cm)
                  </div>

                  <div className='overflow-x-auto mb-[50px] text-default-text'>
                    <table
                      className='table-auto w-full text-default-text border border-gray-border'
                      cellSpacing='0'
                      cellPadding='0'
                    >
                      <thead className='text-default-text font-semibold uppercase border-b border-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='w-1/4 p-2 font-semibold'>SIZE</td>
                          <td className='w-1/4 p-2'>CHEST (in.)</td>
                          <td className='w-1/4 p-2'>WAIST (in.)</td>
                          <td className='w-1/4 p-2'>HIPS (in.)</td>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>S</td>
                          <td className='p-2'>35-37.5</td>
                          <td className='p-2'>29-32</td>
                          <td className='p-2'>35-37.5</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>M</td>
                          <td className='p-2'>37.5-41</td>
                          <td className='p-2'>32-35</td>
                          <td className='p-2'>37.5-41</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>L</td>
                          <td className='p-2'>41-44</td>
                          <td className='p-2'>35-38</td>
                          <td className='p-2'>41-44</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>XL</td>
                          <td className='p-2'>44-48.5</td>
                          <td className='p-2'>38-43</td>
                          <td className='p-2'>44-47</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>2XL</td>
                          <td className='p-2'>48.5-53.5</td>
                          <td className='p-2'>43-47.5</td>
                          <td className='p-2'>47-50.5</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>3XL</td>
                          <td className='p-2'>53.5-58</td>
                          <td className='p-2'>47.5-52.5</td>
                          <td className='p-2'>50.5-53.5</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>4XL</td>
                          <td className='p-2'>58-63</td>
                          <td className='p-2'>52.5-57</td>
                          <td className='p-2'>53.5-58</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='text-tilte-text mb-[10px]'>WOMEN'S TOPS</div>
                  <div className='text-default-text mb-[10px]'>
                    <strong>MEASURE YOURSELF</strong>
                  </div>
                  <div className='mb-[50px]'>
                    <img src='/assets/images/PKhealth/nike-women.jpg' />
                  </div>

                  <div className='text-default-text mb-[10px]'>
                    <strong>FIND YOUR SIZE</strong>
                  </div>
                  <div className='mb-[30px]'>
                    Use the chart below to determine your size. If you're on the
                    borderline between two sizes, order the smaller size for a
                    tighter fit or the larger size for a looser fit. If your
                    measurements for bust and waist correspond to two different
                    suggested sizes, order the size indicated by your bust
                    measurement.
                  </div>
                  <div className='text-tilte-text mb-[10px]'>SIZE CHART</div>
                  <div className='overflow-x-auto mb-[50px] text-default-text'>
                    <table
                      className='table-auto w-full text-default-text border border-gray-border'
                      cellSpacing='0'
                      cellPadding='0'
                    >
                      <thead className='text-default-text font-semibold uppercase border-b border-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>NIKE SIZE</td>
                          <td className='p-2'>AVERAGE US SIZE**</td>
                          <td className='p-2'>BUST (in.)</td>
                          <td className='p-2'>WAIST (in.)</td>
                          <td className='p-2'>HIPS (in.)</td>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>
                            XXS
                          </td>
                          <td className='p-2'>-</td>
                          <td className='p-2'>&lt; 29.5</td>
                          <td className='p-2'>&lt; 23.5</td>
                          <td className='p-2'>&lt; 33</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>
                            XS
                          </td>
                          <td className='p-2'>0-2</td>
                          <td className='p-2'>29.5-32.5</td>
                          <td className='p-2'>23.5-26</td>
                          <td className='p-2'>33-35.5</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>S</td>
                          <td className='p-2'>4-6</td>
                          <td className='p-2'>32.5-35.5</td>
                          <td className='p-2'>26-29</td>
                          <td className='p-2'>35.5-38.5</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>M</td>
                          <td className='p-2'>8-10</td>
                          <td className='p-2'>35.5-38</td>
                          <td className='p-2'>29-31.5</td>
                          <td className='p-2'>38.5-41</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>L</td>
                          <td className='p-2'>12-14</td>
                          <td className='p-2'>38-41</td>
                          <td className='p-2'>31.5-34.5</td>
                          <td className='p-2'>41-44</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>
                            XL
                          </td>
                          <td className='p-2'>16-18</td>
                          <td className='p-2'>41-44.5</td>
                          <td className='p-2'>34.5-38.5</td>
                          <td className='p-2'>44-47</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold font-semibold'>
                            XXL
                          </td>
                          <td className='p-2'>20-22</td>
                          <td className='p-2'>44.5-48.5</td>
                          <td className='p-2'>38.5-42.5</td>
                          <td className='p-2'>47-50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='panel-03 tab-content pb-4 hidden' id='tab3'>
                  <div className='w-full text-large-text text-center mb-[20px]'>
                    PETER MILLAR CHART
                  </div>
                  <div className='mb-[50px]'>
                    <div className='text-tilte-text mb-[10px]'>MEN'S TOPS</div>
                    <div className='text-tilte-text mb-[10px]'>
                      Peter Millar Men's Size Chart
                    </div>
                    <div class="overflow-x-auto">
                    <table
                      className='table-auto w-full text-default-text border border-gray-border'
                      cellspacing='0'
                      cellpadding='0'
                    >
                      <thead className='text-default-text font-semibold uppercase border-b border-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>SIZE</td>
                          <td className='p-2 font-semibold'>SMALL</td>
                          <td className='p-2 font-semibold'>MEDIUM</td>
                          <td className='p-2 font-semibold'>LARGE</td>
                          <td className='p-2 font-semibold'>X-LARGE</td>
                          <td className='p-2 font-semibold'>XX-LARGE</td>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>CHEST</td>
                          <td className='p-2'>36-38"</td>
                          <td className='p-2'>39-41"</td>
                          <td className='p-2'>42-44"</td>
                          <td className='p-2'>45-47"</td>
                          <td className='p-2'>48-50"</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>NECK</td>
                          <td className='p-2'>14.5-15"</td>
                          <td className='p-2'>15.5-16"</td>
                          <td className='p-2'>16.5-17"</td>
                          <td className='p-2'>17.5-18"</td>
                          <td className='p-2'>18.5-19"</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>SLEEVE</td>
                          <td className='p-2'>33-34"</td>
                          <td className='p-2'>34-35"</td>
                          <td className='p-2'>35-36"</td>
                          <td className='p-2'>36-37"</td>
                          <td className='p-2'>37-37.5"</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>WAIST</td>
                          <td className='p-2'>30 "</td>
                          <td className='p-2'>32-34 "</td>
                          <td className='p-2'>36-38"</td>
                          <td className='p-2'>40-42"</td>
                          <td className='p-2'>44"</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                  <div className='mb-[50px]'>
                    <div className='text-tilte-text mb-[10px]'>
                      WOMEN’S TOPS
                    </div>
                    <div className='text-tilte-text mb-[10px]'>
                      Peter Millar Women's Size Chart
                    </div>
                    <div class="overflow-x-auto">
                    <table
                      className='table-auto w-full text-default-text border border-gray-border'
                      cellspacing='0'
                      cellpadding='0'
                    >
                      <thead className='text-default-text font-semibold uppercase border-b border-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>US SIZE</td>
                          <td className='p-2 font-semibold'>0-2 (XS)</td>
                          <td className='p-2 font-semibold'>4-6 (SM)</td>
                          <td className='p-2 font-semibold'>8-10 (M)</td>
                          <td className='p-2 font-semibold'>12-14 (L)</td>
                          <td className='p-2 font-semibold'>16 (XL)</td>
                          <td className='p-2 font-semibold'>18 (XXL)</td>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-border'>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>BUST</td>
                          <td className='p-2'>32.5-33.5"</td>
                          <td className='p-2'>34.5-35.5"</td>
                          <td className='p-2'>36.5-37.5"</td>
                          <td className='p-2'>39-40.5"</td>
                          <td className='p-2'>42-43.5"</td>
                          <td className='p-2'>45-46.5"</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>WAIST</td>
                          <td className='p-2'>27-28"</td>
                          <td className='p-2'>29-30"</td>
                          <td className='p-2'>31-32"</td>
                          <td className='p-2'>34-35"</td>
                          <td className='p-2'>36-37"</td>
                          <td className='p-2'>39-40"</td>
                        </tr>
                        <tr className='divide-x divide-gray-border'>
                          <td className='p-2 font-semibold'>HIPS</td>
                          <td className='p-2'>35-36"</td>
                          <td className='p-2'>37-38"</td>
                          <td className='p-2'>39-40"</td>
                          <td className='p-2'>42-43"</td>
                          <td className='p-2'>45-46"</td>
                          <td className='p-2'>48-50"</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MeasuringGuide;
