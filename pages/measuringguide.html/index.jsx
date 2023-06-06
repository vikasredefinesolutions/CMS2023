const MeasuringGuide = () => {
  const showTab = (id) => {
   
    if (typeof window !== "undefined") {
        let x = document.querySelector('#tabpart');
        if(id == 1)
        {
            x.querySelectorAll("#tablink1")[0].classList.add('bg-light-gray');
            x.querySelectorAll("#tab1")[0].classList.remove('hidden');
            x.querySelectorAll("#tab2")[0].classList.add('hidden');
            x.querySelectorAll("#tablink2")[0].classList.remove('bg-light-gray');
        }
        else
        {
            x.querySelectorAll("#tablink1")[0].classList.remove('bg-light-gray');
            x.querySelectorAll("#tablink2")[0].classList.add('bg-light-gray');
            x.querySelectorAll("#tab2")[0].classList.remove('hidden');
            x.querySelectorAll("#tab1")[0].classList.add('hidden');
        }
    }
  }
  return (
    <>
    <section className="pt-[40px]">
            <div className="container mx-auto">
                <div className="text-2xl-text text-center">MEASURING GUIDE</div>
            </div>
        </section>
        <section className="container mx-auto mt-[50px] mb-[50px]" id="tabpart">
            <div className="">
                <div className="">
                    <div x-data="{activeTab:01}" className="mt-[50px] mb-[50px]">
                        <ul className="flex justify-center flex-wrap items-center border-b border-gray-border">
                            <li className=""><a href="javascript:void(0);" id="tablink1" className="bg-light-gray tab block uppercase font-[600] text-medium-text max-w-[150px] bg-light-gray" onClick={(event) => {showTab(1)}}><img className="max-h-full" src="/assets/images/PKhealth/patagonia.png" alt=""/></a></li>
                            <li className=""><a href="javascript:void(0);" id="tablink2" className="tab block uppercase font-[600] text-medium-text max-w-[150px]" onClick={(event) => {showTab(2)}}><img className="max-h-full" src="/assets/images/PKhealth/nike-1.png" alt="" /></a></li>
                        </ul>
                        <div className="mx-auto pt-[20px]">
                            <div className="panel-01 tab-content pb-4" id="tab1">
                                <div className="mb-[20px]">
                                    <div className="text-large-text text-center mb-[20px]">PATAGONIA SIZE CHART</div>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-1/2 lg:pr-[15px] lg:order-1 order-2 text-default-text">
                                            <p><strong>Men's Fit Guide</strong></p>
                                            <p>Though each Patagonia® product is designed and shaped specifically for its intended use, we can generalize our fit description is four ways:</p>
                                            <p className="!m-0"><strong>Formfitting:</strong></p>
                                            <p>Conforms to the body's contours.</p>
                                            <p className="!m-0"><strong>Slim Fit:</strong></p>
                                            <p>Closer-fitting. Slim-fitting technical garments may be worn over baselayers and light midlayers.</p>
                                            <p className="!m-0"><strong>Regulare Fit:</strong></p>
                                            <p>Neither slim nor oversized. Regular-fitting technical garments may be worn over heavier midlayers.</p>
                                            <p className="!m-0"><strong>Relaxed Fit:</strong></p>
                                            <p>Drapes loosely on the body.</p>
                                        </div>
                                        <div className="w-full lg:w-1/2 lg:pl-[15px] order-1 lg:order-2"><img src="/assets/images/PKhealth/mens-fit-guide.jpg" alt="" /></div>
                                    </div>
                                </div>
                                <div className="mb-[50px] text-default-text">
                                    <div className="mb-[15px]">
                                        <p><strong>Men's Tops and Jackets Sizing Information</strong></p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full text-default-text border border-gray-border" cellSpacing="0" cellPadding="0">
                                            <thead className="text-default-text font-semibold border-b border-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/4 p-2">Size</td>
                                                    <td className="w-1/4 p-2">Chest</td>
                                                    <td className="w-1/4 p-2">Waist</td>
                                                    <td className="w-1/4 p-2">Sleeve</td>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XX-Small</td>
                                                    <td className="p-2">31</td>
                                                    <td className="p-2">26</td>
                                                    <td className="p-2">30</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XX-Small</td>
                                                    <td className="p-2">33</td>
                                                    <td className="p-2">26</td>
                                                    <td className="p-2">30</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Small</td>
                                                    <td className="p-2">34</td>
                                                    <td className="p-2">28</td>
                                                    <td className="p-2">32</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Small</td>
                                                    <td className="p-2">35</td>
                                                    <td className="p-2">28</td>
                                                    <td className="p-2">32</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Small</td>
                                                    <td className="p-2">35</td>
                                                    <td className="p-2">29</td>
                                                    <td className="p-2">33</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Small</td>
                                                    <td className="p-2">37</td>
                                                    <td className="p-2">30</td>
                                                    <td className="p-2">33</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Medium</td>
                                                    <td className="p-2">38</td>
                                                    <td className="p-2">31</td>
                                                    <td className="p-2">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Medium</td>
                                                    <td className="p-2">40</td>
                                                    <td className="p-2">33</td>
                                                    <td className="p-2">34</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Large</td>
                                                    <td className="p-2">42</td>
                                                    <td className="p-2">34</td>
                                                    <td className="p-2">35</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Large</td>
                                                    <td className="p-2">44</td>
                                                    <td className="p-2">36</td>
                                                    <td className="p-2">35</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Large</td>
                                                    <td className="p-2">46</td>
                                                    <td className="p-2">38</td>
                                                    <td className="p-2">36</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Large</td>
                                                    <td className="p-2">48</td>
                                                    <td className="p-2">40</td>
                                                    <td className="p-2">36</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XX-Large</td>
                                                    <td className="p-2">50</td>
                                                    <td className="p-2">42</td>
                                                    <td className="p-2">37</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XX-Large</td>
                                                    <td className="p-2">52</td>
                                                    <td className="p-2">44</td>
                                                    <td className="p-2">37</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XXX-Large</td>
                                                    <td className="p-2">54</td>
                                                    <td className="p-2">46</td>
                                                    <td className="p-2">37.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XXX-Large</td>
                                                    <td className="p-2">56</td>
                                                    <td className="p-2">48</td>
                                                    <td className="p-2">37.5</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-1/2 lg:pr-[15px] lg:order-1 order-2 text-default-text">
                                            <p><strong>Women's Fit Guide</strong></p>
                                            <p>Though each Patagonia® product is designed and shaped specifically for its intended use, we can generalize our fit description is four ways:</p>
                                            <p className="!m-0"><strong>Formfitting:</strong></p>
                                            <p>Conforms to the body's contours.</p>
                                            <p className="!m-0"><strong>Slim Fit:</strong></p>
                                            <p>Closer-fitting. Slim-fitting technical garments may be worn over baselayers and light midlayers.</p>
                                            <p className="!m-0"><strong>Regulare Fit:</strong></p>
                                            <p>Neither slim nor oversized. Regular-fitting technical garments may be worn over heavier midlayers.</p>
                                            <p className="!m-0"><strong>Relaxed Fit:</strong></p>
                                            <p>Drapes loosely on the body.</p>
                                        </div>
                                        <div className="w-full lg:w-1/2 lg:pl-[15px] order-1 lg:order-2"><img src="/assets/images/PKhealth/womens-fit-guide.jpg" alt="" /></div>
                                    </div>
                                </div>
                                <div className="mb-[50px] text-default-text">
                                    <div className="mb-[15px]">
                                        <p><strong>Women's Sizing Information</strong></p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full text-default-text border border-gray-border" cellSpacing="0" cellPadding="0">
                                            <thead className="text-default-text font-semibold border-b border-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="w-1/5 p-2">Size</td>
                                                    <td className="w-1/5 p-2">Numeric</td>
                                                    <td className="w-1/5 p-2">Chest</td>
                                                    <td className="w-1/5 p-2">Waist</td>
                                                    <td className="w-1/5 p-2">Hip</td>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-border">
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">XX-Small</td>
                                                    <td className="p-2">00</td>
                                                    <td className="p-2">31</td>
                                                    <td className="p-2">24.5</td>
                                                    <td className="p-2">33.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Small</td>
                                                    <td className="p-2">0</td>
                                                    <td className="p-2">32</td>
                                                    <td className="p-2">25.5</td>
                                                    <td className="p-2">34.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Small</td>
                                                    <td className="p-2">2</td>
                                                    <td className="p-2">33</td>
                                                    <td className="p-2">26.5</td>
                                                    <td className="p-2">35.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Small</td>
                                                    <td className="p-2">4</td>
                                                    <td className="p-2">34</td>
                                                    <td className="p-2">27.5</td>
                                                    <td className="p-2">36.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Small</td>
                                                    <td className="p-2">6</td>
                                                    <td className="p-2">35</td>
                                                    <td className="p-2">28.5</td>
                                                    <td className="p-2">37.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Medium</td>
                                                    <td className="p-2">8</td>
                                                    <td className="p-2">36</td>
                                                    <td className="p-2">29.5</td>
                                                    <td className="p-2">38.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Medium</td>
                                                    <td className="p-2">10</td>
                                                    <td className="p-2">37</td>
                                                    <td className="p-2">30.5</td>
                                                    <td className="p-2">39.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Large</td>
                                                    <td className="p-2">12</td>
                                                    <td className="p-2">38.5</td>
                                                    <td className="p-2">32</td>
                                                    <td className="p-2">41</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">Large</td>
                                                    <td className="p-2">14</td>
                                                    <td className="p-2">40</td>
                                                    <td className="p-2">33.5</td>
                                                    <td className="p-2">42.5</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-border">
                                                    <td className="p-2 font-semibold">X-Large</td>
                                                    <td className="p-2">16</td>
                                                    <td className="p-2">42</td>
                                                    <td className="p-2">35.5</td>
                                                    <td className="p-2">44.5</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-02 tab-content pb-4 hidden" id="tab2">
                                <div className="text-large-text text-center mb-[20px]">NIKE SIZE CHART</div>
                                <div className="text-tilte-text mb-[10px]">MEN'S TOPS</div>
                                <div className="text-default-text mb-[10px]"><strong>MEASURE YOURSELF</strong></div>
                                <div className="mb-[50px]"><img src="/assets/images/PKhealth/nike-men.jpg"/></div>
                                <div className="text-default-text mb-[10px]"><strong>FIND YOUR SIZE</strong></div>
                                <div className="mb-[30px]">Use the chart below to determine your size. If you're on the borderline between two sizes, order the smaller size for a tighter fit or the larger size for a looser fit. If your measurements for chest and waist correspond to two different suggested sizes, order the size indicated by your chest measurement.</div>
                                <div className="text-tilte-text mb-[10px]">SIZE CHART: REGULAR (5'7"-6'0"/170-183cm)</div>

                                <div className="overflow-x-auto mb-[50px] text-default-text">
                                    <table className="table-auto w-full text-default-text border border-gray-border" cellSpacing="0" cellPadding="0">
                                        <thead className="text-default-text font-semibold uppercase border-b border-gray-border">
                                            <tr className="divide-x divide-gray-border">
                                                <td className="w-1/4 p-2 font-semibold">SIZE</td>
                                                <td className="w-1/4 p-2">CHEST (in.)</td>
                                                <td className="w-1/4 p-2">WAIST (in.)</td>
                                                <td className="w-1/4 p-2">HIPS (in.)</td>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-border">
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">S</td>
                                                <td className="p-2">35-37.5</td>
                                                <td className="p-2">29-32</td>
                                                <td className="p-2">35-37.5</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">M</td>
                                                <td className="p-2">37.5-41</td>
                                                <td className="p-2">32-35</td>
                                                <td className="p-2">37.5-41</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">L</td>
                                                <td className="p-2">41-44</td>
                                                <td className="p-2">35-38</td>
                                                <td className="p-2">41-44</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">XL</td>
                                                <td className="p-2">44-48.5</td>
                                                <td className="p-2">38-43</td>
                                                <td className="p-2">44-47</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">2XL</td>
                                                <td className="p-2">48.5-53.5</td>
                                                <td className="p-2">43-47.5</td>
                                                <td className="p-2">47-50.5</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">3XL</td>
                                                <td className="p-2">53.5-58</td>
                                                <td className="p-2">47.5-52.5</td>
                                                <td className="p-2">50.5-53.5</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">4XL</td>
                                                <td className="p-2">58-63</td>
                                                <td className="p-2">52.5-57</td>
                                                <td className="p-2">53.5-58</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-tilte-text mb-[10px]">WOMEN'S TOPS</div>
                                <div className="text-default-text mb-[10px]"><strong>MEASURE YOURSELF</strong></div>
                                <div className="mb-[50px]"><img src="/assets/images/PKhealth/nike-women.jpg" /></div>

                                <div className="text-default-text mb-[10px]"><strong>FIND YOUR SIZE</strong></div>
                                <div className="mb-[30px]">Use the chart below to determine your size. If you're on the borderline between two sizes, order the smaller size for a tighter fit or the larger size for a looser fit. If your measurements for bust and waist correspond to two different suggested sizes, order the size indicated by your bust measurement.</div>
                                <div className="text-tilte-text mb-[10px]">SIZE CHART</div>
                                <div className="overflow-x-auto mb-[50px] text-default-text">
                                    <table className="table-auto w-full text-default-text border border-gray-border" cellSpacing="0" cellPadding="0">
                                        <thead className="text-default-text font-semibold uppercase border-b border-gray-border">
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold">NIKE SIZE</td>
                                                <td className="p-2">AVERAGE US SIZE**</td>
                                                <td className="p-2">BUST (in.)</td>
                                                <td className="p-2">WAIST (in.)</td>
                                                <td className="p-2">HIPS (in.)</td>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-border">
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">XXS</td>
                                                <td className="p-2">-</td>
                                                <td className="p-2">&lt; 29.5</td>
                                                <td className="p-2">&lt; 23.5</td>
                                                <td className="p-2">&lt; 33</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">XS</td>
                                                <td className="p-2">0-2</td>
                                                <td className="p-2">29.5-32.5</td>
                                                <td className="p-2">23.5-26</td>
                                                <td className="p-2">33-35.5</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">S</td>
                                                <td className="p-2">4-6</td>
                                                <td className="p-2">32.5-35.5</td>
                                                <td className="p-2">26-29</td>
                                                <td className="p-2">35.5-38.5</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">M</td>
                                                <td className="p-2">8-10</td>
                                                <td className="p-2">35.5-38</td>
                                                <td className="p-2">29-31.5</td>
                                                <td className="p-2">38.5-41</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">L</td>
                                                <td className="p-2">12-14</td>
                                                <td className="p-2">38-41</td>
                                                <td className="p-2">31.5-34.5</td>
                                                <td className="p-2">41-44</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">XL</td>
                                                <td className="p-2">16-18</td>
                                                <td className="p-2">41-44.5</td>
                                                <td className="p-2">34.5-38.5</td>
                                                <td className="p-2">44-47</td>
                                            </tr>
                                            <tr className="divide-x divide-gray-border">
                                                <td className="p-2 font-semibold font-semibold">XXL</td>
                                                <td className="p-2">20-22</td>
                                                <td className="p-2">44.5-48.5</td>
                                                <td className="p-2">38.5-42.5</td>
                                                <td className="p-2">47-50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  </>)
}

export default MeasuringGuide;
