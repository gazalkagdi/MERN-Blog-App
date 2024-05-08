import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col">
                <h1 className="text-2xl">Want to see more of my projects?</h1>
                <p className="text-gray-500 my-2">Checkout my Github with multiple Mern projects</p>
                <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none" href="https://github.com/gazalkagdi" target="_blank">Learn more</Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
            </div>
        </div>
    )
}
