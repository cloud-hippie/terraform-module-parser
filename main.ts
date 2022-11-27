import * as fs from 'fs';
import * as path from 'path';

import * as HCL from "js-hcl-parser";

class TerraformTransformer {
    moduleDirectory: string;

    constructor(moduleDirectory: string) {
        this.moduleDirectory = moduleDirectory;
    }

    async getAllFolders(folderName: string) {
        const files = await fs.promises.readdir(folderName);
        const folders = files.filter(file => fs.statSync(path.join(folderName, file)).isDirectory());
        return folders;
    }


   async getTerraformFiles(folderName: string) {
        // Get all files in the directory
        const files = await fs.readdirSync(folderName);
        // Filter out all files that are not .tf
        const terraformFiles = files.filter(file => path.extname(file) === '.tf');
        // Return the files
        return terraformFiles;
    }

    async getTerraformOutputFromFile(terraformFile: string){ 
        try {
            return await HCL.parse(fs.readFileSync(terraformFile, 'utf8'));
        } catch (error) {
            console.log(error);
        }
    }

}



const moveFrom = "./modules";


const main = async () => {
    console.log("Starting");
    const output = new TerraformTransformer(moveFrom)
    let folders = await output.getAllFolders(moveFrom);
    
    
    folders.forEach(async folder => {
        const tfFiles = await output.getTerraformFiles(path.join(moveFrom, folder))
        console.log(`Found the: ${tfFiles} files in the ${folder} folder`);
        tfFiles.forEach(async tfFile => {
            console.log(`Found the: ${tfFile} file in the ${folder} folder`);
            const tfOutput = await output.getTerraformOutputFromFile(path.join(moveFrom, folder, tfFile));
            console.log(tfOutput);
        })
    })

    console.log("Done");
}


main();