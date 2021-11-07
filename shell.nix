{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs-16_x
    nodePackages.typescript-language-server
  ];
}
