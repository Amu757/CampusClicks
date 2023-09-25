import React from 'react'

function Dashboard() {
    return (
        <>   {/* cards   */}

            <div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">1,504</div>
                        <div className="cardName">Daily Views</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="eye-outline" />
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">80</div>
                        <div className="cardName">Sales</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cart-outline" />
                    </div>
                </div>
                <div className="card">
                    <div>
                        <div className="numbers">284</div>
                        <div className="cardName">Comments</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="chatbubble-outline" />
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">$7,876</div>
                        <div className="cardName">Earning</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cash-outline" />
                    </div>
                </div>
            </div>

            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Recent Orders</h2>
                        <a href="#" className="btn">View All </a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Payment</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>
                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span className="status pending">Pending</span></td>
                            </tr>
                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status return">Return</span></td>
                            </tr>
                            <tr>
                                <td>Addidas shoes</td>
                                <td>$620 </td>
                                <td>Due</td>
                                <td><span className="status inProgress">In Progress</span></td>
                            </tr>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>
                            <tr>
                                <td>Dell Laptop</td>
                                <td>$110</td>
                                <td>Due</td>
                                <td><span className="status pending">Pending</span></td>
                            </tr>
                            <tr>
                                <td>Apple Watch</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status return">Return</span></td>
                            </tr>
                            <tr>
                                <td>Addidas shoes</td>
                                <td>$620 </td>
                                <td>Due</td>
                                <td><span className="status inProgress">In Progress</span></td>
                            </tr>

                        </tbody>
                    </table>
                </div>


                {/*  new customers  */}
                <div className="recentCustomers">
                    <div className="cardHeader">
                        <h2>Recent Customers</h2>
                    </div>

                    <table>
                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer2.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Rashmika <br /><span>Italy</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer1.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Amit <br /><span>India</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer2.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Rashmika <br /><span>Italy</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer1.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Amit <br /><span>India</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer2.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Rashmika <br /><span>Italy</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer1.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Amit <br /><span>India</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer2.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Rashmika <br /><span>Italy</span>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src={require("./imgs/costomer1.jpg")} alt="no img" /></div>
                            </td>
                            <td>
                                Amit <br /><span>India</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Dashboard