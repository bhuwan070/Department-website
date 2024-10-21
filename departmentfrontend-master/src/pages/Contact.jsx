import { useState } from 'react';
import { BsPhone } from 'react-icons/bs';
import { CiLocationOn, CiMail } from 'react-icons/ci';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  console.log(formData);
  return (
    <section className="min-h-screen w-full flex justify-center font-[Roboto] pt-10 ">
      <div className="w-full lg:w-[90%] xxl:w-[80%] p-4 flex flex-col justify-center lg:flex-row gap-8 ">
        <div className=" flex flex-col gap-4">
          <div className="flex flex-col gap-3 ">
            <h1 className="text-[30px] font-medium  ">Get in touch</h1>
            <hr className="border-4 border-primary-600 " />
            <h2 className="font-medium text-[20px] ">
              Purwanchal Campus{' '}
              <span className="text-neutral-400 text-lg ">
                - Institute of Engineering
              </span>
            </h2>
            <p>
              Reprehenderit aliqua aliqua nisi cupidatat et.Do velit laboris do
              aute ad ut ea ex officia sint eu incididunt dolore.Ad sunt sit
              incididunt exercitation ea culpa et.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="border min-h-[6rem] py-3 flex gap-2 ">
              <div className="h-8 flex text-primary-500 ">
                <CiLocationOn size="32px" />
              </div>
              <div className="flex flex-col grow">
                <h3 className="h-8 text-xl font-medium">Location</h3>
                <span className="text-neutral-400">Dharan-8, Sunsari</span>
                <span className="text-neutral-400">Nepal</span>
              </div>
            </div>
            <div className="border min-h-[6rem] py-3 flex gap-2 ">
              <div className="h-8 flex text-primary-300 ">
                <BsPhone size="32px" strokeWidth="0.01px" />
              </div>
              <div className="flex flex-col grow">
                <h3 className="h-8 text-xl font-medium">Phone</h3>
                <span className="text-neutral-400">+977 9812345678</span>
                <span className="text-neutral-400">+977 9841234567</span>
              </div>
            </div>
            <div className="border min-h-[6rem] py-3 flex gap-2 ">
              <div className="h-8 flex text-primary-500 ">
                <CiMail size="32px" />
              </div>
              <div className="flex flex-col grow">
                <h3 className="h-8 text-xl font-medium">Email Address</h3>
                <span className="text-neutral-400">info@ioepc.edu.np</span>
                <span className="text-neutral-400">info2@ioepc.edu.np</span>
              </div>
            </div>
            <div className="border min-h-[6rem] py-3 flex gap-2 ">
              <div className="h-8 flex text-primary-500 ">
                <IoIosTimer size="32px" />
              </div>
              <div className="flex flex-col grow">
                <h3 className="h-8 text-xl font-medium">Open</h3>
                <span className="text-neutral-400">
                  Sun-Fri : 10:00 - 17:00
                </span>
                <span className="text-neutral-400">Sat : Closed</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex gap-3 items-center ">
            <h1 className="text-lg font-medium">Our Social Media: </h1>
            <div className="flex gap-3">
              <div className="p-2 cursor-pointer border text-secondary-900 hover:text-white hover:bg-secondary-900 duration-300  ">
                <FaFacebookF />
              </div>
              <div className="p-2 cursor-pointer border text-secondary-900 hover:text-white hover:bg-secondary-900 duration-300  ">
                <FaTwitter />
              </div>
              <div className="p-2 cursor-pointer border text-secondary-900 hover:text-white hover:bg-secondary-900 duration-300  ">
                <FaLinkedinIn />
              </div>
              <div className="p-2 cursor-pointer border text-secondary-900 hover:text-white hover:bg-secondary-900 duration-300  ">
                <FaInstagram />
              </div>
            </div>
          </div>
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33882.49441381352!2d87.29010727795!3d26.793525403233275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b606ce89f9%3A0x7423e72f8e139e05!2sPurwanchal%20Engineering%20Campus(ERC)!5e0!3m2!1sen!2snp!4v1720713748284!5m2!1sen!2snp"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] "
            ></iframe>
          </div>
        </div>
        {/* <div className="w-full xl:w-[50%] ">
          <form className="p-4 flex flex-col gap-4 bg-white rounded-lg ">
            <div className="flex flex-col gap-3 ">
              <h1 className="text-[26px] font-[Railway] font-medium text-sky-500 ">
                Send us a message
              </h1>
              <p className="text-neutral-400 ">
                We&apos;re here to help with any questions or concerns you might
                have. Feel free to drop us a message, and our team will get back
                to you as soon as possible. Whether it&apos;s a query about our
                services or feedback, we value your input.
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="grid md:grid-cols-2 gap-3 ">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Your Name</label>
                  <input
                    className="border-[1px] outline-none focus:border-sky-400 px-3 py-2 "
                    placeholder="Your name "
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone">Phone</label>
                  <input
                    className="border-[1px] outline-none focus:border-sky-400 px-3 py-2 "
                    placeholder="Phone number "
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3 ">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className="border-[1px] outline-none focus:border-sky-400 px-3 py-2 "
                    placeholder="Your email"
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="subject">Subject</label>
                  <input
                    className="border-[1px] outline-none focus:border-sky-400 px-3 py-2 "
                    placeholder="Subject "
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="message">Message</label>
                <textarea
                  className="border-[1px] outline-none focus:border-sky-400 px-3 py-2 resize-y overflow-auto leading-5 "
                  rows={5}
                  placeholder="Your name "
                  name="message"
                  id="message"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
