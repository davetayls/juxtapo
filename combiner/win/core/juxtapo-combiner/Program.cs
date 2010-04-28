using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace juxtapo.Combiner
{
    class Program
    {

        static Regex regexIncludes = new Regex(@"includes.push\(\""([^\""]*\.js)\""\)");
        static Regex regRemoveDebugContainers = new Regex(@"(//##DEBUGSTART)([\s\S]*?)(//##DEBUGEND)");
        static Regex regRemoveDebuging = new Regex(@"[\r]?\n.*//##DEBUG");
		
        static void Main(string[] args)
        {
			String fileLoc = "";
			Dictionary<String,String> commandLineArgs = new Dictionary<String, String>();
			if (!Environment.CommandLine.Contains("-root:")){
	            fileLoc = args[0].Trim('"');	
				if (!Path.IsPathRooted(fileLoc)){
					fileLoc = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(),fileLoc));
				}
			}else{
				foreach (String str in Regex.Split(Environment.CommandLine," -")){
					if (str.Contains(":")){
						string[] keyValue = str.Split(':');
						commandLineArgs.Add(keyValue[0],keyValue[1].Trim('"'));
					}
				}
				fileLoc = commandLineArgs["root"];
			}
            ProcessDirectory(fileLoc,commandLineArgs);
        }

        static void ProcessDirectory(String dir, Dictionary<String,String> commandLineArgs)
        {
            if (dir.Substring(dir.Length - 1) != "\\") {
                dir += "\\";
            }
            String fileCombined = String.Empty;
            Console.WriteLine("- Looking in " + dir);
            if (!Directory.Exists(dir)) return;
            foreach (String f in Directory.GetFiles(dir))
            {
                if (Path.GetExtension(f).Contains("js") && System.IO.File.Exists(f))
                {
                    String fileName = f.Substring(0,f.LastIndexOf("."));
                    String sFile = File.ReadAllText(fileName + ".js");
                    if (sFile.Contains("@juxtapo.combiner"))
                    {
                        Console.WriteLine("- Processing combiner root: " + fileName + ".js");
                        String combined = String.Empty;
                        // removing //##DEBUGSTART //##DEBUGEND containers
                        sFile = regRemoveDebugContainers.Replace(sFile, "");
                        // removing //##DEBUG lines
                        sFile = regRemoveDebuging.Replace(sFile, "");
                        // match includes.push
                        MatchCollection col = regexIncludes.Matches(sFile);
                        foreach (Match m in col) {
                            String matchedFileName = m.Groups[1].Value.Replace("/","\\");
                            if (File.Exists(dir + matchedFileName))
                            {
                                Console.WriteLine("   - Adding to root: " + matchedFileName);
                                combined += File.ReadAllText(dir + matchedFileName);                                
                            }else
                            {
                                Console.WriteLine("   - "+ dir + matchedFileName + ": File doesn't exist in same folder as combiner: " + matchedFileName);
                            }
                        }

                        // removing //##DEBUGSTART //##DEBUGEND containers
                        combined = regRemoveDebugContainers.Replace(combined, "");

                        // removing //##DEBUG lines
                        combined = regRemoveDebuging.Replace(combined, "");
						
						// replacing variables
						if (commandLineArgs.ContainsKey("vars")){
							string[] allVars = commandLineArgs["vars"].Split(';');
							foreach (String v in allVars){
								combined = Regex.Replace(combined,"\\@"+v.Split('=')[0],v.Split('=')[1]);
							}
						}
						
                        // writing combined file
                        if (fileCombined == String.Empty) fileCombined = fileName + ".js";
                        Console.WriteLine("   - Writing combined file: " + fileCombined);
                        StreamWriter fCombined = File.CreateText(fileCombined);
                        Console.WriteLine("     - Saving combined file: " + fileCombined);
                        fCombined.Write(combined);
                        Console.WriteLine("     - Disposing combined file: " + fileCombined);
                        fCombined.Close();
                        fCombined.Dispose();

                        Console.WriteLine("   - Removing separate files");
                        foreach (Match m in col) {
                            String matchedFileName = m.Groups[1].Value;
                            Console.WriteLine("     - Deleting file: " + matchedFileName);
                            if (System.IO.File.Exists(dir + matchedFileName))
                            {
                                System.IO.File.Delete(dir + matchedFileName);    
                            }
							// remove empty directories
							string matchedFileDir = Path.GetDirectoryName(dir + matchedFileName);
							if (Directory.Exists(matchedFileDir)){
								int dirFiles = Directory.GetFiles(matchedFileDir).Length;
								if (dirFiles == 0){
									Console.WriteLine("     - No files in " + matchedFileDir + " so deleting");
									Directory.Delete(matchedFileDir);
								}
							}
                        }
                    }
                }
            }
            foreach (string subDir in Directory.GetDirectories(dir)) {
                ProcessDirectory(subDir,commandLineArgs);
            }
        }
    }
}
