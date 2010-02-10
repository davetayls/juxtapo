using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace jsCombiner
{
    class Program
    {

        static Regex regex = new Regex(@"includes.push\(\""([^\""]*\.js)\""\)");

        static void Main(string[] args)
        {
            String fileLoc = args[0].Trim('"');
            Console.WriteLine("");
            ProcessDirectory(fileLoc);
        }

        static void ProcessDirectory(String dir)
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
                        MatchCollection col = regex.Matches(sFile);
                        foreach (Match m in col) {
                            String matchedFileName = m.Groups[1].Value;
                            if (File.Exists(dir + matchedFileName))
                            {
                                Console.WriteLine("   - Adding to root: " + matchedFileName);
                                combined += "\n\n" + File.ReadAllText(dir + matchedFileName);                                
                            }else
                            {
                                Console.WriteLine("   - File doesn't exist in same folder as combiner: " + matchedFileName);
                            }
                        }

                        // removing //##DEBUG lines
                        Regex regRemoveDebuging = new Regex(@"[\r]?\n.*//##DEBUG");
                        combined = regRemoveDebuging.Replace(combined, "");
                        
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
                        }
                    }
                }
            }
            foreach (string subDir in Directory.GetDirectories(dir)) {
                ProcessDirectory(subDir);
            }
        }
    }
}
