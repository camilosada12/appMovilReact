namespace Utilities.Helpers
{
    public static class ReflectionHelper
    {
        // usa Split para obtener string[] y llama a la sobrecarga que recibe string[]
        public static object? GetNestedPropertyValue(object obj, string path)
        {
            return GetNestedPropertyValue(obj, path.Split('.'));
        }

        // sobrecarga que recibe string[]
        public static object? GetNestedPropertyValue(object obj, string[] path)
        {
            foreach (var part in path)
            {
                if (obj == null) return null;
                var prop = obj.GetType().GetProperty(part);
                if (prop == null) return null;
                obj = prop.GetValue(obj);
            }

            return obj;
        }

        // usa Split para obtener string[] y llama a la sobrecarga que recibe string[]
        public static string PascalJoin(string root, string path)
        {
            return PascalJoin(root, path.Split('.'));
        }

        // sobrecarga que recibe string[]
        public static string PascalJoin(string root, string[] path)
        {
            return root + string.Join("", path.Select(p => char.ToUpper(p[0]) + p.Substring(1)));
        }
    }
}
