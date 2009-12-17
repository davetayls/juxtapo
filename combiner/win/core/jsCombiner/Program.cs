using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace jsCombiner
{
    class Program
    {
        static void Main(string[] args)
        {
            Regex regex = new Regex(@"includes.push\(\""([^\""]*\.js)\""\)");
            String fileLoc = args[0].Trim('"');
            String fileCombined = String.Empty;
            /*
            if (args.Length > 1)
            {
                fileCombined = args[1].Trim('"');
            }
            */
            if (fileLoc.Substring(fileLoc.Length - 1) != "\\")
            {
                fileLoc += "\\";
            }
            Console.WriteLine("");
            Console.WriteLine("- Looking in " + fileLoc);
            foreach (String f in Directory.GetFiles(fileLoc))
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
                            Console.WriteLine("   - Adding to root: " + matchedFileName);
                            combined += "\n\n" + File.ReadAllText(fileLoc + matchedFileName);
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
                            if (System.IO.File.Exists(fileLoc + matchedFileName))
                            {
                                System.IO.File.Delete(fileLoc + matchedFileName);    
                            }
                        }
                    }
                }
            }
        }
    }
}
