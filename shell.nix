{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs-17_x
    nodePackages.typescript-language-server
  ];
}
