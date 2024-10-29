import path = require("path");
import fs = require("fs-extra");
import nodemailer = require("nodemailer");
require('dotenv').config();


class SendEmailNotification {
    private transporter: nodemailer.Transporter;
   
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
          
            auth: {
                user: "kumarvikasg786@gmail.com", // Use environment variables for security
                pass: "pfif ygfi gqia ttxn" // Use environment variables for security
            }
        });
    }

    // Method to send an email with HTML report and video attachments
    public async sendReport(reportFilePath: string, videosDir: string): Promise<void> {
        try {
            console.log('Checking report at path:', reportFilePath); // Log the report file path
            const reportExists = await fs.pathExists(reportFilePath); // Check if the report exists
            if (!reportExists) {
                console.error('HTML report not found at:', reportFilePath); // Log detailed error
                return;
            }
            const videoFiles = await this.getVideoFiles(videosDir);

            const mailOptions = {
                from: "kumarvikasg786@gmail.com",
                to: 'roshanmorkhade96@gmail.com',
                subject: 'Playwright Test Execution Report',
                text: 'Please find the attached HTML report and videos for test execution.',
                attachments: [
                    {
                        filename: path.basename(reportFilePath),
                        path: reportFilePath // Attach the HTML report
                    },
                    ...videoFiles // Attach video files
                ]
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error while sending email:', error);
        }
    }

    private async getVideoFiles(videosDir: string): Promise<{ filename: string, path: string }[]> {
        try {
            const files = await fs.readdir(videosDir);
            return files.map(file => ({
                filename: file,
                path: path.join(videosDir, file)
            }));
        } catch (error) {
            console.error('Error reading video files:', error);
            return [];
        }
    }
}

export const sendEmailNotification = new SendEmailNotification();
